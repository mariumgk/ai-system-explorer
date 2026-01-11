import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkProps {
  position?: [number, number, number];
  scale?: number;
}

export const NeuralNetwork = ({ 
  position = [0, 0, 0],
  scale = 1 
}: NeuralNetworkProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  
  const layers = [4, 6, 8, 6, 4];
  const layerSpacing = 2;
  
  const { nodePositions, linePositions } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];
    const lines: number[] = [];
    
    const totalWidth = (layers.length - 1) * layerSpacing;
    const startX = -totalWidth / 2;
    
    layers.forEach((nodeCount, layerIndex) => {
      const x = startX + layerIndex * layerSpacing;
      const totalHeight = (nodeCount - 1) * 0.8;
      const startY = -totalHeight / 2;
      
      for (let i = 0; i < nodeCount; i++) {
        const y = startY + i * 0.8;
        nodes.push(new THREE.Vector3(x, y, 0));
      }
    });
    
    // Create connections
    let nodeIndex = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const currentLayerStart = nodeIndex;
      const nextLayerStart = nodeIndex + layers[l];
      
      for (let i = 0; i < layers[l]; i++) {
        for (let j = 0; j < layers[l + 1]; j++) {
          const from = nodes[currentLayerStart + i];
          const to = nodes[nextLayerStart + j];
          
          lines.push(from.x, from.y, from.z);
          lines.push(to.x, to.y, to.z);
        }
      }
      
      nodeIndex += layers[l];
    }
    
    return {
      nodePositions: nodes,
      linePositions: new Float32Array(lines)
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial 
          color="#00d4ff" 
          transparent 
          opacity={0.15}
        />
      </lineSegments>
      
      {/* Nodes */}
      {nodePositions.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshBasicMaterial 
            color="#00d4ff" 
            transparent 
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
};
