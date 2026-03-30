import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingShape({ position, geometry, color, speed = 1, wireframe = false }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      meshRef.current.rotation.x = time * speed * 0.3;
      meshRef.current.rotation.y = time * speed * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={wireframe ? 0.5 : 0.6}
        wireframe={wireframe}
      />
    </mesh>
  );
}

function Scene() {
  const sphereGeometry = useMemo(() => new THREE.SphereGeometry(1, 32, 32), []);
  const boxGeometry = useMemo(() => new THREE.BoxGeometry(1.5, 1.5, 1.5), []);
  const torusGeometry = useMemo(() => new THREE.TorusGeometry(1, 0.4, 16, 32), []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4D9FFF" />
      
      <FloatingShape position={[-3, 0, -2]} geometry={sphereGeometry} color="#4D9FFF" speed={0.8} />
      <FloatingShape position={[3, 1, -3]} geometry={boxGeometry} color="#4D9FFF" speed={1.2} wireframe />
      <FloatingShape position={[0, -2, -4]} geometry={torusGeometry} color="#7CB9FF" speed={1} />
      
      <primitive object={new THREE.Object3D()} />
    </>
  );
}

export default function Scene3D() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
