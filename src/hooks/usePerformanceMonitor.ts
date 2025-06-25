
import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = (componentName: string) => {
  const renderCount = useRef(0);
  const startTime = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    
    if (startTime.current > 0) {
      const renderTime = endTime - startTime.current;
      if (renderTime > 16) { // Flag renders > 16ms (60fps threshold)
        console.warn(`${componentName} slow render: ${renderTime.toFixed(2)}ms (render #${renderCount.current})`);
      }
    }
    
    startTime.current = performance.now();
  });

  return {
    renderCount: renderCount.current,
    markRenderStart: () => {
      startTime.current = performance.now();
    }
  };
};
