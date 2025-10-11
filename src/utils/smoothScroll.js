import F from './helpers.js';

// RequestAnimationFrame manager
let preR = 0;
const FR = 1000 / 60;

class RafManager {
  constructor() {
    this.g = [];
    this.on = true;
    F.BM(this, ["loop"]);
    this.raf();
  }

  add(callback) {
    this.g.push(callback);
    this.arg = callback.arg;
  }

  remove(token) {
    let length = this.l();
    for (; length--;) {
      if (this.g[length].token === token) {
        return void this.g.splice(length, 1);
      }
    }
  }

  tOff() {
    this.on = false;
  }

  tOn(time) {
    this.t = null;
    let length = this.l();
    for (; length--;) {
      this.g[length].sT += time;
    }
    this.on = true;
  }

  loop(time) {
    if (this.on) {
      this.t || (this.t = time);
      preR = (time - this.t) / FR;
      this.t = time;
      let length = this.l();
      for (; length--;) {
        const callback = this.g[length];
        if (F.Is.def(callback)) {
          callback.sT || (callback.sT = time);
          const elapsed = time - callback.sT;
          callback.cB.apply(null, [elapsed, ...this.arg]);
        }
      }
    }
    this.raf();
  }

  raf() {
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      requestAnimationFrame(this.loop);
    }
  }

  l = () => this.g.length;
}

const RM = new RafManager();

let RiD = 0;
class RafR {
  constructor(callback) {
    this.on = false;
    this.cb = callback;
    this.n = RiD;
    RiD++;
  }

  run() {
    if (typeof window === 'undefined') return;
    this.arg = Array.from(arguments);
    if (!this.on) {
      RM.add({
        token: this.n,
        cB: this.cb,
        arg: this.arg
      });
      this.on = true;
    }
  }

  stop() {
    if (this.on) {
      RM.remove(this.n);
      this.on = false;
    }
  }
}

// Virtual Scroll class
class VScroll {
  constructor(options) {
    const { cb } = options;
    this.cbY = cb.y;
    this.cbX = cb.x;
    this.c = window._G;
    this.isOn = false;
    this.y = 0;
    this.isFF = F.Snif.isFirefox;
    F.BM(this, ["raf", "run"]);
    
    const scrollEvents = ["wheel", "mousewheel", "keydown"];
    for (let i = 0; i < scrollEvents.length; i++) {
      F.l(document, scrollEvents[i], this.raf);
    }
  }

  xDirection(isX) {
    this.isX = isX;
  }

  on(options) {
    if (options.reset) {
      this.x = 0;
      this.y = 0;
    }
    this.tick = false;
    this.isOn = true;
  }

  off() {
    this.isOn = false;
  }

  scrollTo(value) {
    this.y = -value;
  }

  resize(max) {
    this.max = max;
    this.spaceGap = this.c.win.h - 40;
  }

  raf(event) {
    if (typeof window === 'undefined') return;
    this.e = event;
    this.eT = event.type;
    this.eK = event.key;
    
    if (this.isOn && (!this.tick)) {
      requestAnimationFrame(this.run);
      this.tick = true;
    }
  }

  run() {
    const eventType = this.eT;
    if (eventType === "wheel") {
      this.w();
    } else if (eventType === "mousewheel") {
      this.mw();
    } else if (eventType === "keydown") {
      this.keyD();
    }
  }

  mw() {
    const event = this.e;
    const dx = event.wheelDeltaX || event.wheelDelta;
    const dy = event.wheelDeltaY || event.wheelDelta;
    const delta = Math.abs(dx) >= Math.abs(dy) ? dx : dy;
    
    if (this.isX) {
      this.x += delta;
    } else {
      this.y += dy;
    }
    this.gCb();
  }

  w() {
    const event = this.e;
    let delta = this.isX
      ? (Math.abs(event.wheelDeltaX || -event.deltaX) >= Math.abs(event.wheelDeltaY || -event.deltaY)
        ? (event.wheelDeltaX || -event.deltaX)
        : (event.wheelDeltaY || -event.deltaY))
      : (event.wheelDeltaY || -event.deltaY);

    if (this.isFF && event.deltaMode === 1) delta *= 60;
    delta *= 0.556;
    if (this.isX) {
      this.x += delta;
    } else {
      this.y += delta;
    }
    this.gCb();
  }

  keyD() {
    const key = this.eK;
    const up = key === "ArrowUp";
    const down = key === "ArrowDown";
    const space = key === " ";
    
    if (!up && !down && !space) {
      this.tick = false;
      return;
    }

    let delta = 0;
    if (up) delta = 100;
    else if (down) delta = -100;
    else {
      const dir = this.e.shiftKey ? 1 : -1;
      delta = this.spaceGap * dir;
    }
    this.y += delta;
    this.gCb();
  }

  gCb() {
    if (this.tick) {
      if (this.isX) {
        this.x = F.R(F.Clamp(this.x, -this.max, 0));
        this.cbX(-this.x);
      } else {
        this.y = F.R(F.Clamp(this.y, -this.max, 0));
        this.cbY(-this.y);
      }
      this.tick = false;
    }
  }
}

// Main Scroll class
class S {
  constructor() {
    this.c = typeof window !== 'undefined' ? window._G : null;
    if (this.c) {
      this.c.s = {
        x: 0,
        y: 0,
        stopS: false,
        needS: false
      };
    }

    this.s = {
      x: { curr: 0, targ: 0 },
      y: { curr: 0, targ: 0 }
    };

    F.BM(this, ["sX", "sY", "loop"]);

    this.vScroll = new VScroll({
      cb: {
        x: this.sX,
        y: this.sY
      }
    });
  }

  init(options) {
    if (!this.c) {
      return;
    }
    this.isX = options.isX;
    this.vScroll.xDirection(this.isX);
    this.sUp({ x: 0, y: 0 });
  }

  resize() {
    if (!this.c) return;
    let main = F.G.id("folio");
    if (!main) {
      return;
    }
    let height = main.offsetHeight;
    let width = main.offsetWidth;
    let winHeight = this.c.win.h;
    let dh = height - winHeight;
    let dw = width - winHeight;
    let max = this.isX ? dw : dh;
    console.log('max', max);
    this.vScroll.resize(max);
    this.sUp({
      x: F.Clamp(this.s.x.targ, 0, max),
      y: F.Clamp(this.s.y.targ, 0, max)
    });
  }

  on(options) {
    this.vScroll.on(options);
  }

  off() {
    this.vScroll.off();
  }

  sX(value) {
    if (!this.c || this.c.s.stopS) return;
    this.s.x.targ = F.R(value);
  }

  sY(value) {
    if (!this.c || this.c.s.stopS) return;
    this.s.y.targ = F.R(value);
  }

  loop() {
    if (!this.c) return;
    const y = this.s.y;
    const c = this.c.s;
    
    const needScroll = (c.y !== (this.isX ? this.s.x.targ : this.s.y.targ));
    
    if (c.needS = needScroll) {
      const oldX = this.s.x.curr;
      const oldY = this.s.y.curr;
      this.s.x.curr = F.Damp(this.s.x.curr, this.s.x.targ, 0.09);
      this.s.y.curr = F.Damp(this.s.y.curr, this.s.y.targ, 0.09);
      c.x = F.R(this.s.x.curr);
      c.y = F.R(this.s.y.curr);
    }
  }

  sUp(values) {
    const axes = ["x", "y"];
    for (let i = axes.length; i--;) {
      this.s[axes[i]].targ = values[axes[i]];
      this.s[axes[i]].curr = values[axes[i]];
      this.c.s[axes[i]] = this.s[axes[i]].targ;
    }
  }
}

// Local Scroll class
class LScroll {
  constructor() {
    this.c = typeof window !== 'undefined' ? window._G : null;
    this.sd = this.c ? this.c.cache.LS : null;
  }

  init() {
    if (!this.c || !this.sd) {
      return;
    }
    const lsc = this.sd[this.c.page.is];
    const pick = F.p;

    this.arr = [];
    this.stky = [];
    
    this.hasPar = false;
    this.hasStk = false;

    if (Array.isArray(lsc.scE)) {
      for (let i = 0; i < lsc.scE.length; i++) {
        const element = pick(lsc.scE[i]);
        if (element) {
          this.arr.push({ dom: element, inside: {}, isOut: true });
        }
      }
    }

    const sticky = lsc.stky;
    if (sticky) {
      this.hasStk = true;
      for (let i = sticky.length; i--;) {
        const option = sticky[i];
        const element = pick(option.el);
        const start = option.range[0].split(" ");
        const end = option.range[1] ? option.range[1].split(" ") : false;
        
        if (element) {
          this.stky.push({
            dom: element,
            lockAt: option.pos,
            s: {
              el: pick(start[0]),
              p: start[1]
            },
            e: {
              el: end ? pick(end[0]) : false,
              p: end ? end[1] : ""
            }
          });
        }
      }
    }

    const parallax = lsc.par;
    if (parallax) {
      this.hasPar = true;
      for (let i = parallax.length; i--;) {
        const section = pick(parallax[i].s);
        if (!section) continue;
        
        const obj = {
          dom: section,
          inside: {},
          isOut: true,
          parallax: [],
          parallaxL: parallax[i].arr.length,
          oh: parallax[i].oh
        };
        
        for (let j = 0; j < parallax[i].arr.length; j++) {
          const element = pick(parallax[i].arr[j].el);
          if (element) {
            obj.parallax.push({
              dom: element,
              speed: parallax[i].arr[j].speed != null ? parallax[i].arr[j].speed : 0.5
            });
          }
        }
        this.arr.push(obj);
      }
    }
    
    this.arrL = this.arr.length;
    this.stkL = this.stky.length;
  }

  run() {
    const { c, arr, arrL, hasStk, stky, stkL } = this;
    const sY = c.s.y;
    const sX = c.s.x;
  // run

    for (let i = 0; i < arrL; i++) {
      const element = arr[i];
      const inside = element.inside;
      let inHeight, inWidth;
      
      if (element.stky) {
        inHeight = sY >= inside.top;
        inWidth = sX >= inside.left;
      } else {
        inHeight = sY >= inside.top && sY <= inside.bottom;
        inWidth = sX >= inside.left && sX <= inside.right;
      }
      
      if (inWidth && inHeight) {
        if (element.isOut) {
          element.isOut = false;
        }
        this.draw(element, sY, sX);
      } else {
        if (!element.isOut) {
          element.isOut = true;
          this.draw(element, sY, sX);
        }
      }
    }

    if (hasStk) {
      for (let i = 0; i < stkL; i++) {
        const option = stky[i];
        const sv = option.sv;
        const pin = sY - (sv.start - sv.pos);
        const offset = sv.inf ? Math.max(pin, 0) : F.Clamp(pin, 0, sv.len);
        const effY = sY - offset;

        option.lockY = F.Damp(option.lockY || 0, effY, 0.4);
        this.domUp(option.dom, option.lockY, 0);
      }
    }
  }

  draw(section, height, position) {
    if (section.dom) {
      this.domUp(section.dom, height, position);
    }
    if (this.hasPar) {
      for (let i = 0; i < section.parallaxL; i++) {
        this.domUp(section.parallax[i].dom, height * section.parallax[i].speed, position);
      }
    }
  }

  resize() {
    const h = this.c.s.x;
    const D = this.c.s.y;
    const n = this.c.win.w;
    const t = this.c.win.h;
    const arr = this.arr;
    const hasStk = this.hasStk;
    const stky = this.stky;

    let lockAt = null;
    if (hasStk) {
      const p = this.isX ? "offsetLeft" : "offsetTop";
      lockAt = (el, pos, r) => ({
        top: r ? el[p] : 0,
        center: r ? el[p] + el.offsetHeight / 2 : t / 2,
        bottom: r ? el[p] + el.offsetHeight : t
      }[pos]);

      for (let i = 0; i < stky.length; i++) {
        const option = stky[i];
        const s = D + lockAt(option.s.el, option.s.p, true);
        const e = option.e.el ? D + lockAt(option.e.el, option.e.p, true) : Infinity;
        const p = F.Is.str(option.lockAt) ? lockAt(option.dom, option.lockAt) : option.lockAt;

        option.sv = {
          start: s,
          end: e,
          pos: p,
          len: e - s,
          inf: !isFinite(e)
        };
      }
    }

    for (let i = 0; i < arr.length; i++) {
      const option = arr[i];
      const rect = option.dom.getBoundingClientRect();
      const par = option.parallax;

      let d = rect.top;
      let l = rect.bottom;
      let u = rect.left;
      let s = rect.right;

      if (par) {
        for (let j = 0; j < par.length; j++) {
          const element = par[j];
          const rect2 = element.dom.getBoundingClientRect();
          const f = 1 + element.speed;
          const p = rect2.top / f;
          const g = (rect2.top + rect2.height) / f;
          const y = rect2.left / f;
          const q = (rect2.left + rect2.width) / f;

          if (p < d) d = p;
          if (g > l) l = g;
          if (y > u) u = y;
          if (q > s) s = q;
        }
      }

      option.inside = {
        top: d - t + D,
        bottom: l + D,
        left: u - n + h,
        right: s + h
      };
      this.draw(option, D, h);
    }
  }

  domUp(element, y, x) {
    F.T(element, -x, -y, "px");
  }
}

export { VScroll, S, LScroll, RafR };
export default { VScroll, S, LScroll, RafR };
