/**
 * Custom hook to track component render count
 * Useful for demonstrating the effects of memoization
 */

import { useRef, useEffect } from 'react';

export const useRenderCount = (componentName: string = 'Component'): number => {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    console.log(`🔄 ${componentName} rendered ${renderCount.current} times`);
  });
  
  return renderCount.current;
};

/**
 * Hook to track render time performance
 */
export const useRenderTime = (componentName: string = 'Component') => {
  const renderTime = useRef(0);
  const startTime = useRef(performance.now());
  
  useEffect(() => {
    const endTime = performance.now();
    renderTime.current = endTime - startTime.current;
    console.log(`⏱️ ${componentName} render time: ${renderTime.current.toFixed(2)}ms`);
    startTime.current = performance.now();
  });
  
  return renderTime.current;
};