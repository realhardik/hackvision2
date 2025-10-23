import F from './helpers.js';
import { S, LScroll } from './smoothScroll.js';

// Main smooth scroll engine class
class SmoothScrollEngine {
  constructor() {
    F.BM(this, ["loop", "resize"]);
    this.c = null;
    this.scroll = null;
    this.lsc = null;
    this.raf = null;
    this.ro = null;
    
    if (typeof window !== 'undefined') {
      F.l(window, "resize", this.resize);
      F.l(window, "load", this.resize);
    }
  }

  init(options = {}) {
    if (typeof window !== 'undefined') {
      this.c = window._G;
      
      this.scroll = new S();
      this.lsc = new LScroll();
      this.raf = new F.RafR(this.loop);
      
      this.scroll.init({ isX: options.isX || false });
      this.lsc.init();
      this.resize();

      // Observe layout changes on the main container to keep bounds fresh
      const folio = document.getElementById('folio');
      if ('ResizeObserver' in window && folio) {
        this.ro = new ResizeObserver(() => {
          this.resize();
        });
        this.ro.observe(folio);
      }
      this.raf.run();
    }
  }

  on(options = {}) {
    if (this.scroll) {
      this.scroll.on({
        reset: options.reset || true
      });
    }
  }

  off() {
    if (this.scroll) {
      this.scroll.off();
    }
    if (typeof window !== 'undefined') {
      F.l(window, "resize", this.resize, true);
      F.l(window, "load", this.resize, true);
    }
    if (this.ro) {
      try { this.ro.disconnect(); } catch (_) {}
      this.ro = null;
    }
  }

  loop() {
    if (!this.c || !this.scroll) return;
    this.scroll.loop();
    if (this.c.s.needS && this.lsc) {
      this.lsc.run();
    }
  }

  resize() {
    if (typeof window !== 'undefined' && this.c) {
      // Update window dimensions
      this.c.win.w = window.innerWidth;
      this.c.win.h = window.innerHeight;
      this.c.win.ratio = this.c.win.h / this.c.win.w;
      
      // Resize scroll components
      if (this.scroll) this.scroll.resize();
      if (this.lsc) this.lsc.resize();
    }
  }
}

// Initialize smooth scroll when DOM is ready
export const initSmoothScroll = (options = {}) => {
  if (typeof window === 'undefined') return null;
  
  const engine = new SmoothScrollEngine();
  engine.init(options);
  engine.on();
  
  return engine;
};

// Hook for React components
export const useSmoothScroll = (options = {}) => {
  const React = require('react');
  const [engine, setEngine] = React.useState(null);
  
  React.useEffect(() => {
    const smoothScrollEngine = initSmoothScroll(options);
    setEngine(smoothScrollEngine);
    
    return () => {
      if (smoothScrollEngine) {
        smoothScrollEngine.off();
      }
    };
  }, []);
  
  return engine;
};

export default SmoothScrollEngine;
