"use client";

import * as THREE from "three";
import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export default function PixelDaft({ className="" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const TILE_PX = 90;
    // const IMAGE_SRC = "/assets/tracks/daft1.jpg";

    // --- Setup Renderer ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // --- Scene & Camera ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      window.innerWidth / -2,
      window.innerWidth / 2,
      window.innerHeight / 2,
      window.innerHeight / -2,
      1,
      1000
    );
    camera.position.z = 10;

    // --- Load image and create grid tiles ---
    const loader = new THREE.TextureLoader();
    loader.load(IMAGE_SRC, (texture) => {
      const imgW = texture.image.width;
      const imgH = texture.image.height;
      const cols = Math.ceil(imgW / TILE_PX);
      const rows = Math.ceil(imgH / TILE_PX);
      const totalW = cols * TILE_PX;
      const totalH = rows * TILE_PX;

      const group = new THREE.Group();
      const noise3D = createNoise3D();
      const clock = new THREE.Clock();

      // Prepare offscreen canvas to slice the image
      const canvas = document.createElement("canvas");
      canvas.width = imgW;
      canvas.height = imgH;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(texture.image, 0, 0);

      const geometry = new THREE.PlaneGeometry(TILE_PX, TILE_PX);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const imgData = ctx.getImageData(
            x * TILE_PX,
            y * TILE_PX,
            TILE_PX,
            TILE_PX
          );

          const tileCanvas = document.createElement("canvas");
          tileCanvas.width = TILE_PX;
          tileCanvas.height = TILE_PX;
          const tileCtx = tileCanvas.getContext("2d");
          tileCtx.putImageData(imgData, 0, 0);

          const tileTexture = new THREE.CanvasTexture(tileCanvas);
          const material = new THREE.MeshBasicMaterial({
            map: tileTexture,
            transparent: true,
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = x * TILE_PX - totalW / 2 + TILE_PX / 2;
          mesh.position.y = -(y * TILE_PX - totalH / 2 + TILE_PX / 2);
          mesh.userData.phase = Math.random() * Math.PI * 2;

          group.add(mesh);
        }
      }

      scene.add(group);

      // --- Animation loop ---
      function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        group.children.forEach((tile) => {
          const nx = tile.position.x * 0.002;
          const ny = tile.position.y * 0.002;
          const n = noise3D(nx, ny, t * 0.5);
          const blink = (Math.sin(t * 3 + tile.userData.phase) + n) * 0.5 + 0.5;
          tile.material.opacity = blink * 0.9;
        });

        renderer.render(scene, camera);
      }

      animate();
    });

    // --- Resize handler ---
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className={`${className}`} />;
}
