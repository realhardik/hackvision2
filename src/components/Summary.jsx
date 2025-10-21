
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, cubicBezier } from 'framer-motion';

function MountainsStrip({ className = "", height = 52 }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={className} width="100%" height={height} preserveAspectRatio="none">
            <defs>
                <pattern id="mountainPattern" x="0" y="0" width="250" height="52" patternUnits="userSpaceOnUse">
                    <g transform="scale(1.2019230769,1)">
                        <path
                            d="M113.75 1.95V0H94.25v3.25h19.5V1.95ZM92.95 3.25H84.5v3.25h9.75V3.25ZM123.5 5.2V3.25h-9.75v3.25h9.75ZM83.2 6.5h-1.95v3.25h3.25V6.5ZM126.75 8.45V6.5H123.5v3.25h3.25ZM79.95 9.75h-5.2V13h6.5V9.75ZM133.25 11.7V9.75h-6.5V13h6.5ZM73.45 13h-5.2v3.25h6.5V13ZM139.75 14.95V13h-6.5v3.25h6.5ZM66.95 16.25H65v3.25h3.25v-3.25ZM143 18.2v-1.95h-3.25v3.25H143ZM63.7 19.5h-1.95v3.25H65V19.5ZM146.25 21.45V19.5H143v3.25h3.25ZM60.45 22.75H58.5V26h3.25v-3.25ZM149.5 24.7v-1.95h-3.25V26h3.25ZM57.2 26H52v3.25h6.5V26ZM207.35 26h-5.85v3.25H208V26ZM6.5 27.95V26H0v3.25h6.5V27.95ZM156 27.95V26h-6.5v3.25H156V27.95ZM50.7 29.25h-1.95v3.25H52v-3.25ZM200.2 29.25h-8.45v3.25h9.75v-3.25ZM16.25 31.2V29.25H6.5v3.25h9.75V31.2ZM159.25 31.2V29.25H156v3.25h3.25V31.2ZM47.45 32.5H39v3.25h9.75V32.5ZM190.45 32.5h-1.95v3.25h3.25V32.5ZM19.5 34.45V32.5h-3.25v3.25h3.25V34.45ZM169 34.45V32.5h-9.75v3.25H169V34.45ZM37.7 35.75h-5.2V39H39v-3.25ZM187.2 35.75H182V39h6.5v-3.25ZM26 37.7V35.75h-6.5V39H26V37.7ZM175.5 37.7V35.75H169V39h6.5V37.7ZM31.2 39H26v3.25h6.5V39ZM180.7 39h-5.2v3.25h6.5V39ZM24.7 42.25H19.5v3.25H26v-3.25ZM182 43.55v1.95h6.5v-3.25H182v1.3ZM18.2 45.5H13v3.25h6.5V45.5ZM188.5 46.8v1.95h6.5v-3.25h-6.5v1.3ZM11.7 48.75H6.5V52H13v-3.25ZM195 50.05V52h6.5v-3.25H195v1.3Z"
                            fill="black"
                        />
                    </g>
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height={height} fill="url(#mountainPattern)" />
        </svg>
    );
}

export default function Summary({ className = "" }) {
  const bunnyFrames = [
    '/assets/summary/forest/bunny1.png',
    '/assets/summary/forest/bunny2.png',
    '/assets/summary/forest/bunny3.png',
  ];

  const [frame, setFrame] = useState(0);
  const [flip, setFlip] = useState(false);
  const [currentX, setCurrentX] = useState(0);
  const [animTargetX, setAnimTargetX] = useState(null);
  const [hopParams, setHopParams] = useState({ height: 30, duration: 0.6 });
  const targetRef = useRef(null);

  useEffect(() => {
    const doHop = () => {
      const goingLeft = Math.random() < 0.5;
      const dir = goingLeft ? -1 : 1;
      const height = 30 + Math.random() * 15; 
      const distance = dir * (Math.max(20, height * 0.9) + Math.random() * 10);
      const duration = 0.32 + Math.random() * 0.1;

      const newX = currentX + distance;

      setFlip(goingLeft);

      setHopParams({ height, duration });
      targetRef.current = newX;
      setAnimTargetX(newX);

      setFrame(1);
      setTimeout(() => setFrame(2), Math.max(80, duration * 150));
      setTimeout(() => setFrame(0), Math.max(250, duration * 450));
    };

    const loop = () => {
      doHop();
      if (Math.random() < 0.3) setTimeout(doHop, 700);
    };

    const interval = setInterval(loop, 1600 + Math.random() * 1200);
    return () => clearInterval(interval);
  }, [currentX]);
  const easeBezier = [0.45, 0, 0.55, 1];

  const isAnimating = animTargetX !== null && animTargetX !== currentX;
  const xKeyframes = isAnimating
    ? [currentX, (currentX + (animTargetX)) / 2, animTargetX]
    : currentX;

    return (
      <section id="summary" className={`relative w-full h-auto min-h-screen text-white pt-20 rounded-t-[64px] bg-[#65aef7] ${className}`}>
        <div className="relative w-full h-auto">
          <div className="w-full h-auto relative flex flex-col overflow-hidden mb-20 z-2">
            {/* Clouds Layer */}
            <div id="clouds" className="pointer-events-none absolute inset-0 z-2">
              {/* Animated clouds moving from right to left */}
              <Image
                src="/assets/summary/cloud1.png"
                alt="cloud"
                className="absolute top-[9vh] w-[30vw] sm:w-[22vw] md:w-[14vw] max-w-[220px] h-auto opacity-95 sm:top-[16vh] md:top-[18vh] cloud-animate"
                style={{ animationDelay: '0s' }}
                width={220}
                height={140}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud4.png"
                alt="cloud"
                className="z-1 hidden sm:block absolute top-[8vh] w-[14vw] md:w-[12vw] max-w-[200px] h-auto opacity-85 md:top-[8vh] cloud-animate-slow"
                style={{ animationDelay: '15s' }}
                width={200}
                height={120}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud2.png"
                alt="cloud"
                className="absolute top-[10vh] w-[26vw] sm:w-[18vw] md:w-[12vw] max-w-[200px] h-auto opacity-95 sm:top-[14vh] md:top-[16vh] cloud-animate-slow"
                style={{ animationDelay: '3s' }}
                width={200}
                height={120}
                loading="eager"
                priority
              />
              {/* Hide cloud3 on mobile for cleaner look */}
              <Image
                src="/assets/summary/cloud3.png"
                alt="cloud"
                className="hidden sm:block absolute bottom-[2.5vh] w-[24vw] md:w-[16vw] max-w-[240px] h-auto opacity-90 cloud-animate-fast"
                style={{ animationDelay: '6s' }}
                width={240}
                height={140}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud5.png"
                alt="cloud"
                className="z-1 absolute top-[5vh] w-[28vw] sm:w-[vw] md:w-[19vw] max-w-[210px] h-auto opacity-85 sm:top-[5vh] md:top-[5vh] cloud-animate-slow"
                style={{ animationDelay: '9s' }}
                width={210}
                height={130}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud1.png"
                alt="cloud"
                className="absolute top-[18vh] w-[28vw] sm:w-[20vw] md:w-[14vw] max-w-[220px] h-auto opacity-90 sm:top-[22vh] md:top-[24vh] cloud-animate"
                style={{ animationDelay: '12s' }}
                width={220}
                height={140}
                loading="eager"
                priority
              />
              <Image
                src="/assets/summary/cloud2.png"
                alt="cloud"
                className="absolute top-[22vh] w-[28vw] sm:w-[vw] md:w-[13vw] max-w-[210px] h-auto opacity-85 sm:top-[22vh] md:top-[24vh] cloud-animate-fast"
                style={{ animationDelay: '18s' }}
                width={210}
                height={130}
                loading="eager"
                priority
              />
            </div>

            {/* Mountains Strip at bottom */}
            <div className="w-full h-auto relative z-1 mt-[40vh]">
              <MountainsStrip className="w-full" height={52} />
            </div>
          </div>
          <div className="cg font-medium text-black flex flex-col justify-center items-center text-[3.5vw] md:text-[3.33vw] mb-25">
              <span>
                <span>Lorem Ipsum is simply dummy text</span>
              </span>
              <span>
                <span>of the printing and typesetting industry. Lorem</span>
              </span>
              <span>
                <span>Ipsum has been the industry's standard dummy text ever</span>
              </span>
              <span>
                <span>since the 1500s, when an unknown printer took a galley.</span>
              </span>
          </div>
          <div className="relative w-full h-max mb-5">
            <div className="relative w-full px-5">
              {/* flowers */}
              <div className="relative w-full h-[450px]">
                <div className="absolute w-[25px] top-[20vh] left-[30vw]">
                  <Image src="/assets/summary/forest/flower1.png" alt="" className="" width={25} height={25} loading="eager" priority />
                </div>
                <div className="absolute w-[25px] bottom-[11vh] left-[25vw]">
                  <Image src="/assets/summary/forest/flower3.png" alt="" className="" width={25} height={25} loading="eager" priority />
                </div>
                <div className="absolute w-[25px] bottom-[25%] right-[25%]">
                  <Image src="/assets/summary/forest/flower2.png" alt="" className="" width={25} height={25} loading="eager" priority />
                </div>
                <div className="absolute w-[25px] top-[25%] right-[30%]">
                  <Image src="/assets/summary/forest/flower1.png" alt="" className="" width={25} height={25} loading="eager" priority />
                </div>
                <div className="absolute w-[25px] top-1/2 right-[15%]">
                  <Image src="/assets/summary/forest/flower3.png" alt="" className="" width={25} height={25} loading="eager" priority />
                </div>
                <div className="absolute w-[35px] bottom-[3vh] right-[55%]">
                  <Image src="/assets/summary/forest/bush1.png" alt="" className="" width={35} height={35} loading="eager" priority />
                </div>
                <div className="absolute w-[15px] bottom-[18vh] right-[47vw] rotate-15">
                  <Image src="/assets/summary/forest/carrot.png" alt="" className="" width={35} height={35} loading="eager" priority />
                </div>
                {/* <div className="absolute w-[15px] bottom-[17vh] left-[38vw] rotate-12">
                  <Image src="/assets/summary/forest/carrot.png" alt="" className="" width={35} height={35} loading="eager" priority />
                </div> */}
              </div>
              {/* animals */}
              <div className="absolute top-0 left-0 w-full h-[350px]">
                <div className="absolute top-[35%] left-[25%]">
                  <Image className="w-[60px]" src="/assets/summary/forest/wolf.png" alt="" width={45} height={45} loading="eager" priority />
                </div>
                
                {/* Bunny */}
              <motion.div
                className="absolute top-[50%] left-[50%] pointer-events-none"
                animate={{
                  x: xKeyframes,
                  y: isAnimating ? [0, -hopParams.height, 0] : 0,
                }}
                transition={{
                  duration: isAnimating ? hopParams.duration : 0,
                  ease: easeBezier,
                }}
                onAnimationComplete={() => {
                  // when animation ends, commit new absolute position and clear target
                  const t = targetRef.current;
                  if (typeof t === 'number') {
                    setCurrentX(t);
                  }
                  setAnimTargetX(null);
                  targetRef.current = null;
                }}
                style={{ translateX: 0 }} // ensure using x motion, not css transforms collision
              >
                {/* instant flip applied to inner div (no transition) */}
                <div style={{ transform: flip ? 'scaleX(-1)' : 'scaleX(1)' }}>
                  <Image
                    className="w-[45px] select-none"
                    src={bunnyFrames[frame]}
                    alt="bunny"
                    width={45}
                    height={45}
                    priority
                    draggable={false}
                  />
                </div>
              </motion.div>
                </div>
              {/* trees */}
              <div className="absolute top-[3vh] left-[15vw]">
                <Image className="h-[140px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
              </div>
              <div className="absolute top-[1vh] left-[60%]">
                <Image className="h-[140px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
              </div>
              <div className="absolute top-0 left-[35vw] hidden md:block">
                <Image className="h-[140px] w-auto" src="/assets/summary/forest/tree2.png" alt="" width={125} height={125} loading="eager" priority />
              </div>
              <div className="absolute top-[10vh] right-[18vw] hidden md:block">
                <Image className="h-[140px] w-auto" src="/assets/summary/forest/tree3.png" alt="" width={125} height={125} loading="eager" priority />
              </div>
              <div className="absolute bottom-[4vh] right-[16vh]">
                <Image className="h-[140px] w-auto" src="/assets/summary/forest/tree2.png" alt="" width={125} height={125} loading="eager" priority />
              </div>
              <div className="absolute bottom-0 left-[30vw]">
                <Image className="h-[140px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
              </div>
              <div className="absolute bottom-[11vh] left-[14vw]">
                <Image className="h-[140px] w-auto" src="/assets/summary/forest/tree1.png" alt="" width={125} height={125} loading="eager" priority />
              </div>
            </div>
          </div>
          <div className="relative w-full h-auto">
            <Image src="/assets/summary/tra-nsition.png" className="h-auto w-full" alt="" width={800} height={200} loading="eager" priority />
          </div>
        </div>
      </section>
  )
}