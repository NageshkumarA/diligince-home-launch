// utils/perfUtils.ts
export const perfUtils = {
  measureCoreWebVitals: (
    reportCallback?: (metric: string, value: number) => void
  ) => {
    if (typeof window === "undefined" || !("performance" in window)) {
      return;
    }

    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navigation) {
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;

      // Log to console for debugging
      console.log("Page Load Time:", loadTime, "ms");

      // Optionally report to analytics / monitoring
      if (reportCallback) {
        reportCallback("pageLoadTime", loadTime);
      }
    }
  },
};
