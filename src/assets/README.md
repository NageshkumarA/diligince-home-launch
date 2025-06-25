
# Assets Directory

## Overview
This directory contains static assets used throughout the application, including images, icons, and other media files. Assets are organized by type and usage to maintain consistency and optimize loading performance.

## Current Assets

### Images

#### hero-image.jpg
- **Purpose**: Main hero section background image on homepage
- **Usage**: Featured prominently on Index.tsx homepage
- **Specifications**:
  - High-resolution image suitable for hero sections
  - Optimized for web delivery
  - Responsive design compatible
- **Location**: `src/assets/hero-image.jpg`

## Asset Categories

### Marketing Images
- **Purpose**: Images used in marketing and promotional content
- **Usage**: Homepage, about page, marketing sections
- **Examples**: Hero images, team photos, company imagery
- **Optimization**: High quality with web optimization

### Product Images
- **Purpose**: Product catalog and showcase images
- **Usage**: Vendor catalogs, product listings, demonstrations
- **Requirements**: Consistent sizing, professional quality
- **Formats**: JPG, PNG, WebP for optimization

### User Interface Assets
- **Purpose**: UI elements, backgrounds, patterns
- **Usage**: Component backgrounds, decorative elements
- **Characteristics**: Consistent with design system, scalable

### Icons and Graphics
- **Purpose**: Custom icons and graphic elements
- **Usage**: Specialized icons not available in Lucide React
- **Formats**: SVG preferred for scalability, PNG for complex graphics

### Documents and Media
- **Purpose**: Downloadable documents, media files
- **Usage**: Resource downloads, documentation, media content
- **Types**: PDFs, videos, audio files

## Asset Organization Structure

### Planned Directory Structure
```
/src/assets/
├── images/
│   ├── marketing/          # Marketing and promotional images
│   ├── products/           # Product and service images
│   ├── ui/                 # UI backgrounds and patterns
│   ├── avatars/            # Default avatar images
│   └── logos/              # Company and brand logos
├── icons/
│   ├── custom/             # Custom SVG icons
│   ├── brands/             # Brand and vendor logos
│   └── specializations/    # Industry-specific icons
├── documents/
│   ├── templates/          # Document templates
│   ├── guides/             # User guides and documentation
│   └── legal/              # Legal documents and terms
└── media/
    ├── videos/             # Video content
    └── audio/              # Audio files
```

## Asset Management Best Practices

### Image Optimization
```typescript
// Image import and usage patterns
import heroImage from '@/assets/images/marketing/hero-image.jpg';

const HeroSection = () => {
  return (
    <div 
      className="hero-section bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Hero content */}
    </div>
  );
};
```

### Responsive Images
```typescript
// Responsive image handling
const ResponsiveImage = ({ src, alt, className }) => {
  return (
    <picture>
      <source 
        media="(max-width: 768px)" 
        srcSet={`${src}-mobile.jpg`} 
      />
      <source 
        media="(max-width: 1200px)" 
        srcSet={`${src}-tablet.jpg`} 
      />
      <img 
        src={`${src}-desktop.jpg`}
        alt={alt}
        className={className}
        loading="lazy"
      />
    </picture>
  );
};
```

### SVG Icon Management
```typescript
// Custom SVG icon component
import { SVGProps } from 'react';

export const CustomIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none">
      {/* SVG path */}
    </svg>
  );
};
```

## Asset Loading Strategies

### Lazy Loading
```typescript
// Lazy loading for performance
const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`image-container ${className}`}>
      {!isLoaded && <div className="image-placeholder">Loading...</div>}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? 'block' : 'none' }}
        loading="lazy"
      />
    </div>
  );
};
```

### Preloading Critical Assets
```typescript
// Preload critical images
useEffect(() => {
  const criticalImages = [
    '/assets/images/hero-image.jpg',
    '/assets/images/logo.png'
  ];
  
  criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}, []);
```

## File Naming Conventions

### Image Files
- Use descriptive, kebab-case names: `company-hero-image.jpg`
- Include size indicators when relevant: `logo-small.png`, `logo-large.png`
- Use consistent prefixes for categories: `marketing-`, `product-`, `ui-`

### Icon Files
- Descriptive names indicating purpose: `upload-document-icon.svg`
- Size indicators for multiple sizes: `icon-24.svg`, `icon-48.svg`
- State indicators: `button-hover-icon.svg`, `button-active-icon.svg`

### Document Files
- Clear, professional naming: `user-guide.pdf`, `terms-of-service.pdf`
- Version indicators when applicable: `api-documentation-v2.pdf`
- Language indicators: `privacy-policy-en.pdf`, `privacy-policy-es.pdf`

## Format Guidelines

### Image Formats
- **JPEG**: Photographs, complex images with many colors
- **PNG**: Images with transparency, simple graphics
- **WebP**: Modern format with better compression (where supported)
- **SVG**: Icons, logos, simple graphics (scalable)

### Optimization Standards
- **File Size**: Optimize for web delivery without quality loss
- **Dimensions**: Appropriate resolution for intended use
- **Compression**: Balance between quality and file size
- **Progressive Loading**: Support for progressive JPEG where applicable

## Accessibility Considerations

### Alt Text Requirements
```typescript
// Proper alt text implementation
<img 
  src={heroImage} 
  alt="Modern industrial facility showcasing advanced manufacturing technology" 
/>

// Decorative images
<img 
  src={decorativePattern} 
  alt="" 
  role="presentation" 
/>
```

### Color Contrast
- Ensure sufficient contrast ratios for text overlays
- Test images with various backgrounds
- Consider color blindness implications

## Performance Optimization

### Image Compression
- Use tools like ImageOptim, TinyPNG for optimization
- Implement responsive image serving
- Consider CDN delivery for static assets

### Bundle Size Management
- Avoid importing large assets directly in components
- Use dynamic imports for non-critical assets
- Implement code splitting for asset-heavy routes

### Caching Strategies
```typescript
// Service worker caching for assets
const ASSET_CACHE = 'assets-v1';

self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(ASSET_CACHE).then(cache => {
        return cache.match(event.request).then(response => {
          return response || fetch(event.request).then(fetchResponse => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  }
});
```

## Legal and Licensing

### Image Rights
- Ensure proper licensing for all images
- Document image sources and attribution requirements
- Maintain records of purchased stock images
- Verify commercial use permissions

### Brand Assets
- Respect trademark and copyright restrictions
- Obtain permission for third-party logos
- Maintain consistent brand representation
- Follow brand guidelines for partner logos

## Contributing Guidelines

### Adding New Assets
1. **Organization**: Place in appropriate category folder
2. **Naming**: Follow established conventions
3. **Optimization**: Optimize for web delivery
4. **Documentation**: Update this README with new assets
5. **Licensing**: Ensure proper rights and attribution
6. **Testing**: Test loading and display across devices

### Asset Review Process
1. Check file size and optimization
2. Verify format appropriateness
3. Test responsive behavior
4. Validate accessibility requirements
5. Confirm licensing compliance
6. Update asset inventory

### Quality Standards
- Professional quality and consistency
- Brand alignment and visual coherence
- Technical specifications compliance
- Accessibility requirements fulfillment
- Performance impact consideration
- Legal compliance verification
