import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DataStreamProps {
  position?: [number, number, number];
  count?: number;
  height?: number;
  radius?: number;
}

export const DataStream = ({ 
  position = [0, 0, 0],
  count = 100,
  height = 20,
  radius = 0.3
}: DataStreamProps) => {
  const points = useRef<THREE.Points>(null);
  
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      
      positions[i3] = Math.cos(angle) * r;
      positions[i3 + 1] = (Math.random() - 0.5) * height;
      positions[i3 + 2] = Math.sin(angle) * r;
      
      speeds[i] = 0.02 + Math.random() * 0.03;
    }
    
    return { positions, speeds };
  }, [count, height, radius]);

  useFrame(() => {
    if (!points.current) return;
    
    const positionArray = points.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positionArray[i3 + 1] += speeds[i];
      
      if (positionArray[i3 + 1] > height / 2) {
        positionArray[i3 + 1] = -height / 2;
      }
    }
    
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={position}>
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#00d4ff"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};
