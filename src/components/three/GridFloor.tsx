import { useMemo } from 'react';
import * as THREE from 'three';

interface GridFloorProps {
  size?: number;
  divisions?: number;
  fadeDistance?: number;
}

export const GridFloor = ({ 
  size = 100, 
  divisions = 50,
  fadeDistance = 40
}: GridFloorProps) => {
  const { positions, colors } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    
    const step = size / divisions;
    const half = size / 2;
    const color = new THREE.Color('#00d4ff');
    
    for (let i = 0; i <= divisions; i++) {
      const pos = -half + i * step;
      
      // Calculate fade based on distance from center
      const distanceX = Math.abs(pos) / fadeDistance;
      const opacity = Math.max(0, 1 - distanceX);
      
      // X lines
      positions.push(-half, 0, pos);
      positions.push(half, 0, pos);
      colors.push(color.r, color.g, color.b, opacity * 0.3);
      colors.push(color.r, color.g, color.b, opacity * 0.3);
      
      // Z lines
      positions.push(pos, 0, -half);
      positions.push(pos, 0, half);
      colors.push(color.r, color.g, color.b, opacity * 0.3);
      colors.push(color.r, color.g, color.b, opacity * 0.3);
    }
    
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors)
    };
  }, [size, divisions, fadeDistance]);

  return (
    <lineSegments position={[0, -5, 0]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 4}
          array={colors}
          itemSize={4}
        />
      </bufferGeometry>
      <lineBasicMaterial 
        vertexColors 
        transparent 
        opacity={0.5}
        blending={THREE.AdditiveBlending}
      />
    </lineSegments>
  );
};
