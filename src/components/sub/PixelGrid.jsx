// PixelGrid.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function PixelGrid({ className = "" }) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    meshes: [],
  });

  // Texture factory - simple grid with white borders
  const makeTexture = (size = 128) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    
    // Transparent fill
    ctx.clearRect(0, 0, size, size);
    
    // White border with 0.7 opacity
    ctx.strokeStyle = "rgba(255, 255, 255, 0.55)";
    ctx.lineWidth = 0.3;
    ctx.strokeRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = tex.minFilter = THREE.NearestFilter;
    return tex;
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();

    const squareSize = 120;
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
          const mat = new THREE.MeshBasicMaterial({
            map: makeTexture(128),
            transparent: true,
          });
          const mesh = new THREE.Mesh(geom, mat);

          const x = c * squareSize + squareSize / 2;
          const y = r * squareSize + squareSize / 2;
          mesh.position.set(x, h - y, 0);

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

    // Single render
    renderer.render(scene, camera);

    return () => {
      ro.disconnect();
      stateRef.current.meshes.forEach((m) => {
        scene.remove(m);
      });
      geom.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{
        background: `radial-gradient(ellipse at 0% 0%, #081116 0%, transparent 70%),
                     radial-gradient(ellipse at 0% 100%, #325fEC 0%, transparent 70%),
                     radial-gradient(ellipse at 100% 0%, #538FFF 0%, transparent 70%),
                     radial-gradient(ellipse at 100% 100%, #fff 0%, transparent 70%),
                     #1a2a4a`
      }}
    >
      <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}