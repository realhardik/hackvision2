// PixelGrid.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PixelGrid({ className = "" }) {
  const mountRef = useRef(null);
  const frameRef = useRef(0);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    meshes: [],
  });

  const ACCENT_COLORS = [
    "#FFB800",
    "#FF6600",
    "#FFFFFF",
    "#1E1E1E",
  ];

  // Texture factory
  const makeTexture = (size = 128, border = 0.15, fill = null) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = fill || "#000";
    ctx.fillRect(0, 0, size, size);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = border;
    ctx.strokeRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = tex.minFilter = THREE.NearestFilter;
    return tex;
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();

    const squareSize = 90;
    const geom = new THREE.PlaneGeometry(squareSize, squareSize);

    stateRef.current = { scene, camera, renderer, meshes: [] };

    // Build grid
    const buildGrid = () => {
      const { meshes } = stateRef.current;
      meshes.forEach((m) => scene.remove(m));
      meshes.length = 0;

      const w = mount.clientWidth;
      const h = mount.clientHeight;
      const cols = Math.ceil(w / squareSize);
      const rows = Math.ceil(h / squareSize);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let fill = null;

          if (r === 0) {
            fill = null;
          } else if (Math.random() < 0.1) {
            fill = ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)];
          }

          const mat = new THREE.MeshBasicMaterial({
            map: makeTexture(128, 0.15, fill),
          });
          const mesh = new THREE.Mesh(geom, mat);

          const x = c * squareSize + squareSize / 2;
          const y = r * squareSize + squareSize / 2;
          mesh.position.set(x, h - y, 0);

          mesh.userData = {
            base: mesh.position.clone(),
            animId: null,
            nudged: false,
          };

          scene.add(mesh);
          meshes.push(mesh);
        }
      }

      camera.left = 0;
      camera.right = w;
      camera.top = h;
      camera.bottom = 0;
      camera.near = -1000;
      camera.far = 1000;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    ro.observe(mount);

    // Mouse tracking
    const mouse = new THREE.Vector3();
    let mouseInCanvas = false;

    const onMouseMove = (e) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = rect.height - (e.clientY - rect.top);
      mouseInCanvas = true;
    };

    const onMouseLeave = () => {
      mouseInCanvas = false;
    };

    mount.addEventListener("mousemove", onMouseMove);
    mount.addEventListener("mouseleave", onMouseLeave);

    // Nudge settings
    const NUDGE = 10;
    const RETURN_MS = 300;

    const startReturn = (mesh) => {
      if (mesh.userData.animId) return;
      const startPos = mesh.position.clone();
      const endPos = mesh.userData.base.clone();
      const start = performance.now();

      const animate = (now) => {
        const t = Math.min((now - start) / RETURN_MS, 1);
        const ease = 1 - (1 - t) * (1 - t);
        mesh.position.lerpVectors(startPos, endPos, ease);
        renderer.render(scene, camera);

        if (t < 1) {
          mesh.userData.animId = requestAnimationFrame(animate);
        } else {
          mesh.userData.animId = null;
          mesh.userData.nudged = false;
          mesh.material.color.setHex(0xffffff);
        }
      };

      mesh.userData.animId = requestAnimationFrame(animate);
    };

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);

      if (!mouseInCanvas) {
        stateRef.current.meshes.forEach((mesh) => {
          if (mesh.userData.nudged && !mesh.userData.animId) {
            startReturn(mesh);
          }
        });
      } else {
        const half = squareSize / 2;
        stateRef.current.meshes.forEach((mesh) => {
          const left = mesh.position.x - half;
          const right = mesh.position.x + half;
          const top = mesh.position.y - half;
          const bottom = mesh.position.y + half;

          const inside =
            mouse.x >= left &&
            mouse.x <= right &&
            mouse.y >= top &&
            mouse.y <= bottom;

          if (inside) {
            if (mesh.userData.animId) {
              cancelAnimationFrame(mesh.userData.animId);
              mesh.userData.animId = null;
            }

            const dir = new THREE.Vector3()
              .subVectors(mouse, mesh.position)
              .normalize();

            mesh.position.addScaledVector(dir, NUDGE);
            mesh.material.color.setHex(0xff6666);
            mesh.userData.nudged = true;
          } else if (mesh.userData.nudged && !mesh.userData.animId) {
            startReturn(mesh);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      mount.removeEventListener("mousemove", onMouseMove);
      mount.removeEventListener("mouseleave", onMouseLeave);
      stateRef.current.meshes.forEach((m) => {
        if (m.userData.animId) cancelAnimationFrame(m.userData.animId);
        scene.remove(m);
      });
      geom.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`absolute inset-0 bg-black ${className}`}>
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}