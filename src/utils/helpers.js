// Helper functions extracted from the original smooth scroll implementation

export const F = {};

// Transform utility
F.T = (element, x, y, unit = "%", additional = "") => {
  element.style.transform = `translate3d(${x}${unit}, ${y}${unit}, 0) ${additional}`;
};

// Get element utilities
F.g = (target, method, selector) => {
  return (target || document)[`getElement${method}`](selector);
};

F.G = {
  id: (selector, target) => F.g(target, "ById", selector),
  class: (selector, target) => Array.from(F.g(target, "sByClassName", selector)),
  tag: (selector, target) => F.g(target, "sByTagName", selector),
  query: (selector, target, all = false) => (target || document)[`querySelector${all ? "All" : ""}`](selector)
};

// Bind methods utility
F.BM = (object, methods) => {
  const length = methods.length;
  for (let i = 0; i < length; i++) {
    object[methods[i]] = object[methods[i]].bind(object);
  }
};

// Event listener utility
F.l = (target, event, handler, remove = false) => {
  const elements = F.p(target);
  const length = elements.length;
  const eventName = event;
  const passiveEvents = ["wheel", "mousemove", "touchStart", "touchEnd"];
  const options = passiveEvents.includes(eventName) && { passive: false };
  const action = remove ? "remove" : "add";
  
  for (let i = 0; i < length; i++) {
    elements[i][`${action}EventListener`](eventName, handler, options);
  }
};

// Create element utility
F.Cr = (tag) => document.createElement(tag);

// Check if object has property
F.has = (property, object) => object.hasOwnProperty(property);

// Parse selector utility
F.p = (selector, target) => {
  if (typeof selector === "string") {
    return selector.charAt(0) === "#" 
      ? F.G.id(selector.substring(1), target) 
      : F.G.class(selector.substring(1), target);
  }
  return [].concat([selector]);
};

// Type checking utilities
F.Is = {
  str: (value) => typeof value === "string",
  obj: (value) => value === Object(value),
  arr: (value) => value.constructor === Array,
  def: (value) => typeof value !== "undefined",
  und: (value) => typeof value === "undefined"
};

// Fetch utility
F.Fetch = (options) => {
  const method = options.method || (options.type === "json" ? "GET" : "GET");
  const responseType = options.type === "html" ? "text" : "json";
  const fetchOptions = {
    method: method,
    mode: "same-origin",
    headers: {
      "Content-type": options.type === "html" 
        ? "application/x-www-form-urlencoded" 
        : "application/json"
    }
  };
  
  if (method === "POST") {
    fetchOptions.body = JSON.stringify(options.body);
  }
  
  fetch(options.url, fetchOptions)
    .then(response => {
      if (response.ok) {
        return response[responseType]();
      }
      if (options.error) options.error();
    })
    .then(data => {
      if (options.success) options.success(data);
    });
};

// Math utilities
F.Clamp = (value, min, max) => Math.min(Math.max(value, min), max);
F.R = (value, precision) => {
  precision = F.Is.und(precision) ? 100 : Math.pow(10, precision);
  return Math.round(value * precision) / precision;
};

// Browser detection
F.Snif = {
  uA: typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '',
  get isMobile() {
    if (typeof navigator === 'undefined') return false;
    return /mobi|android|iphone/.test(this.uA) || 
           (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  },
  get isMobileAndroid() {
    return /android.*mobile/.test(this.uA);
  },
  get isAndroid() {
    return this.isMobileAndroid || (!this.isMobileAndroid && /android/i.test(this.uA));
  },
  get isFirefox() {
    return this.uA.indexOf("firefox") > -1;
  },
  get safari() {
    return this.uA.match(/version\/[\d.]+.*safari/);
  },
  get isSafari() {
    return !!this.safari && !this.isAndroid;
  },
  get isEdge() {
    return /Edge\/\d./i.test(this.uA);
  }
};

// Easing functions
F.Ease = {
  lin: t => t,
  i1: t => 1 - Math.cos((t * Math.PI) / 2),
  o1: t => Math.sin((t * Math.PI) / 2),
  io1: t => -(Math.cos(Math.PI * t) - 1) / 2,
  i2: t => t * t,
  o2: t => 1 - (1 - t) * (1 - t),
  io2: t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  i3: t => t * t * t,
  o3: t => 1 - Math.pow(1 - t, 3),
  io3: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  i4: t => t * t * t * t,
  o4: t => 1 - Math.pow(1 - t, 4),
  io4: t => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2,
  i5: t => t * t * t * t * t,
  o5: t => 1 - Math.pow(1 - t, 5),
  io5: t => t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
  i6: t => t === 0 ? 0 : Math.pow(2, 10 * t - 10),
  o6: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  io6: t => t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2,
  oe: t => t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI) / 3) + 1,
  ob: t => 1 + (1.70158 + 1) * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2)
};

// Lerp function
F.Lerp = (start, end, factor) => start * (1 - factor) + end * factor;

// Damp function
let preR = 1; // Initialize to 1 instead of 0
F.Damp = (start, end, factor) => {
  const result = F.Lerp(start, end, 1 - Math.exp(Math.log(1 - factor) * preR));
  return result;
};

// Style utilities
F.S = {
  C: (element, property, value) => {
    const elements = F.Is.arr(element) ? element : false;
    if (!elements) {
      element.style[property] = value;
      return true;
    }
    elements.forEach(el => {
      el.style[property] = value;
    });
    return true;
  },
  d: (element, show) => {
    F.S.C(element, "display", show ? "block" : "none");
    F.S.pe(element, show);
  },
  pe: (element, enable) => F.S.C(element, "pointerEvents", enable ? "all" : "none"),
  opacity: (element, value) => F.S.C(element, "opacity", value),
  bg: (element, value) => F.S.C(element, "backgroundColor", value),
  color: (element, value) => F.S.C(element, "color", value),
  class: (element, className, remove) => {
    if (remove) {
      element.classList.remove(className);
    } else {
      element.classList.add(...className);
    }
  }
};

// SVG utilities
F.Svg = {
  split: (path) => {
    const tokens = path.match(/([a-zA-Z])|(-?\d*\.?\d+)/g);
    return tokens.map(token => isNaN(token) ? token : +token);
  }
};

// Get transform values
F.Gt = {
  i: (element, axis) => {
    const transform = element.style.transform || "";
    const start = transform.indexOf("(");
    const end = transform.indexOf(")");
    const values = transform.slice(start + 1, end).split(",");
    const x = (values[0] && values[0].trim()) || 0;
    const y = (values[1] && values[1].trim()) || 0;
    return axis === "x" ? x : y;
  },
  x: (element) => F.Gt.i(element, "x"),
  y: (element) => F.Gt.i(element, "y")
};

// RafR class for RequestAnimationFrame management
class RafR {
  constructor(callback) {
    this.on = false;
    this.cb = callback;
    this.n = Math.random() * 1000000; // Simple ID generation
  }

  run() {
    if (typeof window === 'undefined') return;
    this.arg = Array.from(arguments);
    if (!this.on) {
      // Continuous RAF implementation
      this.on = true;
      const loop = (time) => {
        if (this.on) {
          this.cb.apply(null, [time, ...this.arg]);
          this.rafId = requestAnimationFrame(loop);
        }
      };
      this.rafId = requestAnimationFrame(loop);
    }
  }

  stop() {
    if (this.on && this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.on = false;
    }
  }
}

F.RafR = RafR;

export default F;
