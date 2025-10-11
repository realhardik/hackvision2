export const scrollConfig = {
  cache: {
    LS: {
      home: {
        scE: ["#summary", "#tracks"],
      }
    }
  }
};

export const createGlobalConfig = () => {
  return {
    c: "d",
    cache: scrollConfig.cache,
    win: {
      w: typeof window !== 'undefined' ? window.innerWidth : 0,
      h: typeof window !== 'undefined' ? window.innerHeight : 0,
      ratio: 0
    },
    s: {
      x: 0,
      y: 0,
      stopS: false,
      needS: false
    },
    page: {
      is: "home",
      was: false
    },
    r: {
      current: { url: "/", page: "home" },
      recent: false
    },
    isMutating: false
  };
};

export default scrollConfig;
