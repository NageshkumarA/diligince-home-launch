/**
 * File Cache Service
 * Implements 2-tier caching strategy: In-Memory (fast) + IndexedDB (persistent)
 * Optimizes performance by reducing external API calls for file viewing
 */

interface CachedFile {
    blobUrl: string; // Browser-created Blob URL
    timestamp: number; // When cached
    fileKey: string; // S3 file key
    size: number; // File size in bytes
}

class FileCacheService {
    private memoryCache: Map<string, CachedFile> = new Map();
    private db: IDBDatabase | null = null;

    // Cache config
    private readonly DB_NAME = 'diligence_file_cache';
    private readonly STORE_NAME = 'files';
    private readonly MEMORY_TTL = 30 * 60 * 1000; // 30 minutes
    private readonly INDEXEDDB_TTL = 2 * 60 * 60 * 1000; // 2 hours
    private readonly MAX_MEMORY_SIZE = 50 * 1024 * 1024; // 50MB

    private currentMemorySize = 0;

    /**
     * Initialize IndexedDB for persistent caching
     */
    async init(): Promise<void> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.DB_NAME, 1);

            request.onerror = () => {
                console.warn('IndexedDB failed to open, caching will be memory-only:', request.error);
                resolve(); // Don't fail, just continue without IndexedDB
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('✅ File cache initialized with IndexedDB');
                resolve();
            };

            request.onupgradeneeded = (event) => {
                const db = (event.target as IDBOpenDBRequest).result;
                if (!db.objectStoreNames.contains(this.STORE_NAME)) {
                    const store = db.createObjectStore(this.STORE_NAME, { keyPath: 'fileKey' });
                    store.createIndex('timestamp', 'timestamp', { unique: false });
                    console.log('📦 Created file cache object store');
                }
            };
        });
    }

    /**
     * Get file from cache
     * Checks memory first (fastest), then IndexedDB (slower but persistent)
     */
    async get(fileKey: string): Promise<Blob | null> {
        // 1. Check memory cache (instant)
        const memCached = this.memoryCache.get(fileKey);
        if (memCached && Date.now() - memCached.timestamp < this.MEMORY_TTL) {
            console.log('📦 Cache HIT (memory):', fileKey);
            try {
                const response = await fetch(memCached.blobUrl);
                return await response.blob();
            } catch (error) {
                console.warn('Failed to fetch from memory cache:', error);
                this.memoryCache.delete(fileKey);
            }
        }

        // 2. Check IndexedDB (slower but persistent)
        if (this.db) {
            try {
                const dbCached = await this.getFromIndexedDB(fileKey);
                if (dbCached && Date.now() - dbCached.timestamp < this.INDEXEDDB_TTL) {
                    console.log('📦 Cache HIT (IndexedDB):', fileKey);

                    // Convert ArrayBuffer back to Blob
                    const blob = new Blob([dbCached.data], { type: dbCached.contentType });

                    // Promote to memory cache for faster future access
                    await this.setToMemory(fileKey, blob);

                    return blob;
                }
            } catch (error) {
                console.warn('IndexedDB read error:', error);
            }
        }

        console.log('❌ Cache MISS:', fileKey);
        return null;
    }

    /**
     * Store file in both memory and IndexedDB caches
     */
    async set(fileKey: string, blob: Blob): Promise<void> {
        // Store in memory
        await this.setToMemory(fileKey, blob);

        // Store in IndexedDB
        if (this.db) {
            try {
                await this.setToIndexedDB(fileKey, blob);
            } catch (error) {
                console.warn('IndexedDB write error:', error);
            }
        }
    }

    /**
     * Store in memory cache with size management
     */
    private async setToMemory(fileKey: string, blob: Blob): Promise<void> {
        // Check memory limits
        while (this.currentMemorySize + blob.size > this.MAX_MEMORY_SIZE && this.memoryCache.size > 0) {
            // Evict oldest entry
            const oldestKey = Array.from(this.memoryCache.entries())
                .sort((a, b) => a[1].timestamp - b[1].timestamp)[0][0];

            const evicted = this.memoryCache.get(oldestKey);
            if (evicted) {
                URL.revokeObjectURL(evicted.blobUrl);
                this.currentMemorySize -= evicted.size;
                this.memoryCache.delete(oldestKey);
                console.log('🗑️ Evicted from memory cache:', oldestKey);
            }
        }

        // Create blob URL and cache
        const blobUrl = URL.createObjectURL(blob);
        this.memoryCache.set(fileKey, {
            blobUrl,
            timestamp: Date.now(),
            fileKey,
            size: blob.size,
        });

        this.currentMemorySize += blob.size;
        console.log(`💾 Cached in memory: ${fileKey} (${(blob.size / 1024).toFixed(1)} KB)`);
    }

    /**
     * Get from IndexedDB
     */
    private getFromIndexedDB(fileKey: string): Promise<{
        data: ArrayBuffer;
        contentType: string;
        timestamp: number;
    } | null> {
        return new Promise((resolve, reject) => {
            if (!this.db) return resolve(null);

            const transaction = this.db.transaction([this.STORE_NAME], 'readonly');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.get(fileKey);

            request.onsuccess = () => {
                resolve(request.result || null);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Store in IndexedDB
     */
    private async setToIndexedDB(fileKey: string, blob: Blob): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) return resolve();

            const reader = new FileReader();

            reader.onload = () => {
                const transaction = this.db!.transaction([this.STORE_NAME], 'readwrite');
                const store = transaction.objectStore(this.STORE_NAME);

                store.put({
                    fileKey,
                    data: reader.result as ArrayBuffer,
                    contentType: blob.type,
                    timestamp: Date.now(),
                    size: blob.size,
                });

                transaction.oncomplete = () => {
                    console.log(`💾 Cached in IndexedDB: ${fileKey}`);
                    resolve();
                };
                transaction.onerror = () => reject(transaction.error);
            };

            reader.onerror = () => reject(reader.error);
            reader.readAsArrayBuffer(blob);
        });
    }

    /**
     * Clear all caches (call on page unload)
     */
    async clear(): Promise<void> {
        // Revoke all blob URLs to free memory
        this.memoryCache.forEach((cached) => {
            URL.revokeObjectURL(cached.blobUrl);
        });
        this.memoryCache.clear();
        this.currentMemorySize = 0;

        // Clear IndexedDB
        if (this.db) {
            try {
                await this.clearIndexedDB();
            } catch (error) {
                console.warn('IndexedDB clear error:', error);
            }
        }

        console.log('🧹 File cache cleared');
    }

    /**
     * Clear IndexedDB
     */
    private clearIndexedDB(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (!this.db) return resolve();

            const transaction = this.db.transaction([this.STORE_NAME], 'readwrite');
            const store = transaction.objectStore(this.STORE_NAME);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /**
     * Get cache statistics
     */
    getStats(): {
        memoryCount: number;
        memorySize: number;
        memorySizeMB: string;
    } {
        return {
            memoryCount: this.memoryCache.size,
            memorySize: this.currentMemorySize,
            memorySizeMB: (this.currentMemorySize / (1024 * 1024)).toFixed(2),
        };
    }
}

// Singleton instance
export const fileCacheService = new FileCacheService();
