'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BunnyHopper({ top = '50%', left = '50%' }) {
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
        const doHop = (goingLeft = null, startX = null) => {
          const goingLeftFinal = goingLeft !== null ? goingLeft : Math.random() < 0.5;
          const dir = goingLeftFinal ? -1 : 1;
        
          const baseX = startX !== null ? startX : currentX;
          const height = 30 + Math.random() * 15;
          const distance = dir * (Math.max(20, height * 0.9) + Math.random() * 10);
          const duration = 0.32 + Math.random() * 0.1;
        
          const newX = baseX + distance;
        
          setFlip(goingLeftFinal);
          setHopParams({ height, duration });
          targetRef.current = newX;
          setAnimTargetX(newX);
        
          setFrame(1);
          setTimeout(() => setFrame(2), Math.max(80, duration * 150));
          setTimeout(() => setFrame(0), Math.max(250, duration * 450));
        };
    
        const loop = () => {
          const goingLeft = Math.random() < 0.5;
    
          doHop(goingLeft);
          
          if (Math.random() < 0.3) {
            setTimeout(() => {
              doHop(goingLeft, targetRef.current);
            }, 700);
    }
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
    <motion.div
        className={`absolute pointer-events-none`}
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
        style={{ top, left, translateX: 0 }} // ensure using x motion, not css transforms collision
        >
        {/* instant flip applied to inner div (no transition) */}
        <div style={{ transform: flip ? 'scaleX(-1)' : 'scaleX(1)' }}>
            <Image
            className="w-[55px] select-none"
            src={bunnyFrames[frame]}
            alt="bunny"
            width={45}
            height={45}
            priority
            draggable={false}
            />
        </div>
        </motion.div>
  );
}
