
export const perfUtils = {
  measureCoreWebVitals: () => {
    // Simple performance measurement
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        console.log('Page Load Time:', navigation.loadEventEnd - navigation.fetchStart);
      }
    }
  }
};
