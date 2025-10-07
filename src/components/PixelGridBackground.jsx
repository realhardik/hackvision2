'use client';
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PixelGridBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    const squares = [];
    const geometry = new THREE.PlaneGeometry(1, 1);

    function createGrid() {
      squares.forEach(s => {
        scene.remove(s.mesh);
        s.mesh.material.dispose();
      });
      squares.length = 0;

      camera.position.z = 10;

      const vFOV = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      const columns = 20;
      const squareSize = visibleWidth / columns;
      const rows = Math.ceil(visibleHeight / squareSize);

      const startX = -visibleWidth / 2 + squareSize / 2;
      const startY = -visibleHeight / 2 + squareSize / 2;

      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          const material = new THREE.MeshBasicMaterial({ color: 0x111111 });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.set(squareSize, squareSize, 1);
          mesh.position.set(startX + x * squareSize, startY + y * squareSize, 0);
          scene.add(mesh);

          squares.push({
            mesh,
            baseColor: 0x111111,
            targetColor: 0x00ffff,
            progress: 0,
            state: "idle",
            timer: 0
          });
        }
      }
    }

    createGrid();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredSquare = null;
    let lastMouseMove = performance.now();
    const GLOW_ACTIVE_TIME = 0.4; // 200ms window after mouse moves

    window.addEventListener("mousemove", (event) => {
      lastMouseMove = performance.now();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const clock = new THREE.Clock();
    const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const HOVER_DELAY = 0.15; // 150ms delay
    const HOVER_DURATION = 0.2; // 150ms ease-in
    const FADE_DURATION = 0.4; // smooth fade-out

    function animate() {
      const delta = clock.getDelta();
      requestAnimationFrame(animate);

      const now = performance.now();
      const mouseMovedRecently = now - lastMouseMove < GLOW_ACTIVE_TIME * 1000;

      // Only set hovered square if mouse moved recently
      if (mouseMovedRecently) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(squares.map(s => s.mesh));

        if (intersects.length > 0) {
          const sq = squares.find(s => s.mesh === intersects[0].object);
          if (hoveredSquare && hoveredSquare !== sq) {
            hoveredSquare.state = "fading";
            hoveredSquare.timer = 0;
          }
          hoveredSquare = sq;
          if (sq.state !== "hovering") {
            sq.state = "hovering";
            sq.timer = 0;
          }
        } else if (hoveredSquare) {
          hoveredSquare.state = "fading";
          hoveredSquare.timer = 0;
          hoveredSquare = null;
        }
      } else {
        // mouse stopped → fade out previous
        if (hoveredSquare && hoveredSquare.state === "hovering") {
          hoveredSquare.state = "fading";
          hoveredSquare.timer = 0;
          hoveredSquare = null;
        }
      }

      // update all squares
      squares.forEach(s => {
        if (s.state === "hovering") {
          s.timer += delta;
          const t = Math.max(0, (s.timer - HOVER_DELAY) / HOVER_DURATION);
          s.progress = ease(Math.min(t, 1));
        } else if (s.state === "fading") {
          s.timer += delta;
          const t = Math.min(s.timer / FADE_DURATION, 1);
          s.progress = 1 - ease(t);
          if (t >= 1) {
            s.state = "idle";
            s.progress = 0;
          }
        }

        s.mesh.material.color.lerpColors(
          new THREE.Color(s.baseColor),
          new THREE.Color(s.targetColor),
          s.progress
        );
      });

      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      createGrid();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10 w-full h-full" />;
}

//single

// 'use client';
// import { useEffect, useRef } from "react";
// import * as THREE from "three";

// export default function PixelGridBackground() {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     const mount = mountRef.current;

//     // === Scene setup ===
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 1);
//     mount.appendChild(renderer.domElement);

//     const squares = [];
//     const geometry = new THREE.PlaneGeometry(1, 1);

//     function createGrid() {
//       // Remove old grid
//       squares.forEach(s => scene.remove(s.mesh));
//       squares.length = 0;

//       // Camera setup
//       camera.position.z = 10;
//       camera.updateProjectionMatrix();

//       // Compute visible area at this distance
//       const vFOV = (camera.fov * Math.PI) / 180; // vertical fov in radians
//       const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
//       const visibleWidth = visibleHeight * camera.aspect;

//       // How many squares?
//       const columns = 80;
//       const squareSize = visibleWidth / columns;
//       const rows = Math.ceil(visibleHeight / squareSize);

//       const startX = -visibleWidth / 2 + squareSize / 2;
//       const startY = -visibleHeight / 2 + squareSize / 2;

//       for (let x = 0; x < columns; x++) {
//         for (let y = 0; y < rows; y++) {
//           const material = new THREE.MeshBasicMaterial({ color: 0x111111 });
//           const square = new THREE.Mesh(geometry, material);
//           square.scale.set(squareSize, squareSize, 1);
//           square.position.set(startX + x * squareSize, startY + y * squareSize, 0);
//           scene.add(square);
//           squares.push({ mesh: square, intensity: 0 });
//         }
//       }
//     }

//     createGrid();

//     // === Mouse interactivity ===
//     const raycaster = new THREE.Raycaster();
//     const mouse = new THREE.Vector2();
//     window.addEventListener("mousemove", (event) => {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     });

//     // === Animation loop ===
//     function animate() {
//       requestAnimationFrame(animate);

//       raycaster.setFromCamera(mouse, camera);
//       const intersects = raycaster.intersectObjects(squares.map(s => s.mesh));
//       if (intersects.length > 0) {
//         intersects.forEach(hit => {
//           const s = squares.find(sq => sq.mesh === hit.object);
//           if (s) s.intensity = 1;
//         });
//       }

//       squares.forEach(s => {
//         s.intensity = Math.max(0, s.intensity - 0.04);
//         const glow = new THREE.Color(0x00ffff);
//         const base = new THREE.Color(0x111111);
//         s.mesh.material.color.lerpColors(base, glow, s.intensity);
//       });

//       renderer.render(scene, camera);
//     }
//     animate();

//     // === Handle resize ===
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       createGrid();
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       mount.removeChild(renderer.domElement);
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={mountRef} className="fixed inset-0 -z-10 w-full h-full" />;
// }
