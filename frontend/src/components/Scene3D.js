import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const animationRef = useRef(null);
  const meshesRef = useRef([]);
  const particlesRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x4D9FFF, 0.4);
    pointLight2.position.set(-10, -5, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x7CB9FF, 0.3);
    pointLight3.position.set(5, -10, 5);
    scene.add(pointLight3);

    // Floating shapes
    const shapes = [
      { geo: new THREE.SphereGeometry(1, 32, 32), pos: [-4, 1.5, -3], color: 0x4D9FFF, speed: 0.6, wire: false },
      { geo: new THREE.BoxGeometry(1.5, 1.5, 1.5), pos: [4, -1, -4], color: 0x3B82F6, speed: 0.8, wire: true },
      { geo: new THREE.TorusGeometry(1, 0.4, 16, 32), pos: [-2, -2.5, -5], color: 0x7CB9FF, speed: 0.5, wire: false },
      { geo: new THREE.OctahedronGeometry(0.8, 0), pos: [3, 2.5, -6], color: 0x60A5FA, speed: 1, wire: true },
      { geo: new THREE.IcosahedronGeometry(1.2, 1), pos: [-5, -0.5, -7], color: 0x93C5FD, speed: 0.4, wire: false },
      { geo: new THREE.SphereGeometry(0.7, 32, 32), pos: [1, 3, -8], color: 0x2563EB, speed: 0.7, wire: true },
    ];

    const meshes = [];
    shapes.forEach(({ geo, pos, color, speed, wire }) => {
      const material = new THREE.MeshStandardMaterial({
        color,
        roughness: 0.2,
        metalness: 0.8,
        transparent: true,
        opacity: wire ? 0.3 : 0.4,
        wireframe: wire,
      });
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(pos[0], pos[1], pos[2]);
      mesh.userData = { baseY: pos[1], speed };
      scene.add(mesh);
      meshes.push(mesh);
    });
    meshesRef.current = meshes;

    // Particles
    const particleCount = 300;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x4D9FFF,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      meshes.forEach((mesh) => {
        const { baseY, speed } = mesh.userData;
        mesh.rotation.x = time * speed * 0.3;
        mesh.rotation.y = time * speed * 0.2;
        mesh.position.y = baseY + Math.sin(time * speed) * 0.5;
      });

      if (particles) {
        particles.rotation.y = time * 0.02;
        particles.rotation.x = time * 0.01;
      }

      // Subtle camera follow mouse
      camera.position.x += (mouseRef.current.x * 0.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      meshes.forEach((mesh) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      if (particles) {
        particles.geometry.dispose();
        particles.material.dispose();
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-testid="scene-3d"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
    />
  );
}
