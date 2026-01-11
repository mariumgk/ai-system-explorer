import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingRingsProps {
  position?: [number, number, number];
  count?: number;
}

export const FloatingRings = ({ 
  position = [0, 0, 0],
  count = 3 
}: FloatingRingsProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);

  useFrame((state) => {
    ringsRef.current.forEach((ring, i) => {
      if (ring) {
        const offset = i * 0.5;
        ring.rotation.x = state.clock.elapsedTime * 0.3 + offset;
        ring.rotation.y = state.clock.elapsedTime * 0.2 + offset;
        ring.rotation.z = state.clock.elapsedTime * 0.1 + offset;
      }
    });
  });

  return (
    <group ref={groupRef} position={position}>
      {Array.from({ length: count }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { if (el) ringsRef.current[i] = el; }}
        >
          <torusGeometry args={[1.5 + i * 0.5, 0.02, 16, 100]} />
          <meshBasicMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.4 - i * 0.1}
          />
        </mesh>
      ))}
    </group>
  );
};
