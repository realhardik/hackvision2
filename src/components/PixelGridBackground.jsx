'use client';
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PixelGridBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 1);
    mount.appendChild(renderer.domElement);

    const squares = [];
    let gridColumns = 0;
    let gridRows = 0;
    const geometry = new THREE.PlaneGeometry(1, 1);

    function createGrid() {
      squares.forEach(s => {
        scene.remove(s.mesh);
        s.mesh.material.dispose();
      });
      squares.length = 0;

      camera.position.z = 10;

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      const vFOV = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFOV / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      const columns = 20;
      const squareSize = visibleWidth / columns;
      const rows = Math.ceil(visibleHeight / squareSize);

      gridColumns = columns;
      gridRows = rows;

      const startX = -visibleWidth / 2 + squareSize / 2;
      const startY = -visibleHeight / 2 + squareSize / 2;

      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          const material = new THREE.MeshBasicMaterial({ color: 0x000000, toneMapped: false,  opacity: 1 });
          const mesh = new THREE.Mesh(geometry, material);
          mesh.scale.set(squareSize, squareSize, 1);
          mesh.position.set(startX + x * squareSize, startY + y * squareSize, 0);
          scene.background = new THREE.Color(0x000000);
          scene.add(mesh);

          squares.push({
            mesh,
            baseColor: 0x000000,
            targetColor: 0x000000,
            progress: 0,
            state: "idle",
            timer: 0,
            ix: x,
            iy: y,
            lastActivatedSec: 0
          });
        }
      }
    }

    createGrid();

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hasNewMouseEvent = false;
    let activeGroupSquares = null; 
    const MIN_HOVER_HOLD = 1.3;

    window.addEventListener("mousemove", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      hasNewMouseEvent = true;
    });

    const clock = new THREE.Clock();
    const ease = t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

    const HOVER_DELAY = 0.2;
    const HOVER_DURATION = 0.2;
    const FADE_DURATION = 0.2;

    // helper to get square by indices (push order is x major)
    const getSquareAt = (ix, iy) => {
      if (ix < 0 || iy < 0 || ix >= gridColumns || iy >= gridRows) return null;
      const index = ix * gridRows + iy;
      return squares[index] || null;
    };

    // build a 2x2 block anchored so that the hovered cell is within the block
    const get2x2BlockFor = (sq) => {
      if (!sq) return null;
      let bx = sq.ix < gridColumns - 1 ? sq.ix : sq.ix - 1;
      let by = sq.iy < gridRows - 1 ? sq.iy : sq.iy - 1;
      bx = Math.max(0, Math.min(bx, gridColumns - 2));
      by = Math.max(0, Math.min(by, gridRows - 2));
      const s00 = getSquareAt(bx, by);
      const s10 = getSquareAt(bx + 1, by);
      const s01 = getSquareAt(bx, by + 1);
      const s11 = getSquareAt(bx + 1, by + 1);
      const group = [s00, s10, s01, s11].filter(Boolean);
      return { originX: bx, originY: by, group };
    };

    function animate() {
      const delta = clock.getDelta();
      requestAnimationFrame(animate);

      const now = performance.now();
      const nowSec = now / 1000;

      // Only recompute intersections on actual mouse move
      let intersects = [];
      if (hasNewMouseEvent) {
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(squares.map(s => s.mesh));
        hasNewMouseEvent = false;
      }

      if (intersects.length > 0) {
        const sq = squares.find(s => s.mesh === intersects[0].object);
        const block = get2x2BlockFor(sq);
        // detect whether the 2x2 group changed
        const sameGroup =
          activeGroupSquares &&
          activeGroupSquares.length === block.group.length &&
          activeGroupSquares.every((s, i) => s === block.group[i]);

        if (!sameGroup) {
          activeGroupSquares = block.group;
          // assign random palette to the 4 squares (independent of which is hovered)
          const basePalette = [0x0466c8, 0x0353a4, 0x023e7d, 0x002855];
          const palette = [...basePalette].sort(() => Math.random() - 0.5);
          block.group.forEach((s, idx) => {
            s.targetColor = palette[Math.min(idx, palette.length - 1)];
          });
        }

        // mark active group's squares as hovering and refresh their hold timer
        const activeSet = new Set(block.group);
        block.group.forEach(s => {
          if (s.state !== "hovering") {
            s.state = "hovering";
            s.timer = 0;
          }
          s.lastActivatedSec = nowSec;
        });

        // non-active squares: start fading only after per-square hold time passes
        squares.forEach(s => {
          if (!activeSet.has(s) && s.state === "hovering" && (nowSec - s.lastActivatedSec) >= MIN_HOVER_HOLD) {
            s.state = "fading";
            s.timer = 0;
          }
        });
      } else {
        // No new intersections; allow per-square hold to manage fade
        activeGroupSquares = null;
        squares.forEach(s => {
          if (s.state === "hovering" && (nowSec - s.lastActivatedSec) >= MIN_HOVER_HOLD) {
            s.state = "fading";
            s.timer = 0;
          }
        });
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
      if (!mount) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      createGrid();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 -z-10 w-full h-full" />;
}
