// Performance optimization utilities for smooth animations

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Optimized scroll handler
export const createOptimizedScrollHandler = (callback) => {
  let ticking = false;
  
  const update = () => {
    callback();
    ticking = false;
  };
  
  const requestTick = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };
  
  return requestTick;
};

// Intersection Observer with performance optimizations
export const createOptimizedObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: [0, 0.1, 0.5, 1],
    ...options
  };
  
  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
};

// Optimized animation frame handler
export const createAnimationLoop = (callback) => {
  let isRunning = false;
  let animationId;
  
  const loop = (timestamp) => {
    if (isRunning) {
      callback(timestamp);
      animationId = requestAnimationFrame(loop);
    }
  };
  
  return {
    start: () => {
      if (!isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(loop);
      }
    },
    stop: () => {
      isRunning = false;
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    }
  };
};

// Lazy loading for images
export const createLazyImageLoader = () => {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  return imageObserver;
};

// Preload critical resources
export const preloadCriticalResources = (resources) => {
  resources.forEach(resource => {
    if (resource.type === 'image') {
      const img = new Image();
      img.src = resource.src;
    } else if (resource.type === 'font') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = resource.src;
      document.head.appendChild(link);
    }
  });
};

// Memory cleanup utility
export const cleanupAnimations = (elements) => {
  elements.forEach(element => {
    if (element && element.style) {
      element.style.willChange = 'auto';
      element.style.transform = '';
      element.style.transition = '';
    }
  });
};

// Performance monitoring
export const performanceMonitor = {
  start: (label) => {
    if (performance && performance.mark) {
      performance.mark(`${label}-start`);
    }
  },
  
  end: (label) => {
    if (performance && performance.mark && performance.measure) {
      performance.mark(`${label}-end`);
      performance.measure(label, `${label}-start`, `${label}-end`);
    }
  },
  
  getMetrics: () => {
    if (performance && performance.getEntriesByType) {
      return performance.getEntriesByType('measure');
    }
    return [];
  }
};

export default {
  debounce,
  throttle,
  createOptimizedScrollHandler,
  createOptimizedObserver,
  createAnimationLoop,
  createLazyImageLoader,
  preloadCriticalResources,
  cleanupAnimations,
  performanceMonitor
};