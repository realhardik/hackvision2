import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PixelGrid({ className="" }) {
  const mountRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({ scene: null, camera: null, renderer: null, meshes: [] });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
  
    function onMouseMove(e) {
      const rect = mount.getBoundingClientRect();
      const mouse = new THREE.Vector2(
        e.clientX - rect.left,
        rect.height - (e.clientY - rect.top)
      );
  
      stateRef.current.meshes.forEach(mesh => {
        const dist = mesh.position.distanceTo(mouse);
        if (dist < 100) {
          const offset = new THREE.Vector3(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            0
          );
          mesh.position.add(offset);
          const startPos = mesh.position.clone();
          const endPos = mesh.userData.basePosition.clone();
          const startTime = performance.now();
  
          function animateBack(time) {
            const t = Math.min(1, (time - startTime) / 2000);
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            mesh.position.lerpVectors(startPos, endPos, ease);
            if (t < 1) requestAnimationFrame(animateBack);
          }
          requestAnimationFrame(animateBack);
        }
      });
    }
  
    mount.addEventListener("mousemove", onMouseMove);
    return () => mount.removeEventListener("mousemove", onMouseMove);
  }, []);
  

  return (
    <div className={`absolute top-0 left-0 w-full h-full bg-black ${className}`}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
