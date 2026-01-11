import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useEffect } from 'react';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { ParticleField } from './ParticleField';
import { DataStream } from './DataStream';
import { NeuralNetwork } from './NeuralNetwork';
import { FloatingRings } from './FloatingRings';
import { GridFloor } from './GridFloor';
import { useFrame, useThree } from '@react-three/fiber';

interface CameraControllerProps {
  targetPosition: [number, number, number];
  targetLookAt: [number, number, number];
}

const CameraController = ({ targetPosition, targetLookAt }: CameraControllerProps) => {
  const { camera } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame(() => {
    // Smooth camera position interpolation
    camera.position.lerp(
      new THREE.Vector3(...targetPosition),
      0.02
    );
    
    // Smooth look-at interpolation
    currentLookAt.current.lerp(
      new THREE.Vector3(...targetLookAt),
      0.02
    );
    
    camera.lookAt(currentLookAt.current);
  });
  
  return null;
};

interface Scene3DProps {
  currentSection: number;
}

export const Scene3D = ({ currentSection }: Scene3DProps) => {
  // Camera positions for different sections
  const cameraStates: { position: [number, number, number]; lookAt: [number, number, number] }[] = [
    // Boot state - far back, looking at center
    { position: [0, 2, 15], lookAt: [0, 0, 0] },
    // Projects - closer, slightly angled
    { position: [8, 3, 10], lookAt: [0, 0, 0] },
    // Capabilities - side view
    { position: [-10, 2, 8], lookAt: [0, 0, 0] },
    // Experience - elevated view
    { position: [0, 8, 12], lookAt: [0, 0, 0] },
    // Awards - close up
    { position: [5, 1, 8], lookAt: [0, 0, 0] },
    // Contact - pull back
    { position: [0, 3, 18], lookAt: [0, 0, 0] },
  ];

  const currentState = cameraStates[currentSection] || cameraStates[0];

  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 2, 15]} fov={60} />
          <CameraController 
            targetPosition={currentState.position} 
            targetLookAt={currentState.lookAt} 
          />
          
          {/* Ambient lighting */}
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.5} color="#00d4ff" />
          <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8b5cf6" />
          
          {/* Background elements */}
          <ParticleField count={1500} spread={60} />
          <GridFloor size={100} divisions={50} />
          
          {/* Central neural network */}
          <NeuralNetwork position={[0, 0, 0]} scale={1.2} />
          
          {/* Floating rings around center */}
          <FloatingRings position={[0, 0, 0]} count={3} />
          
          {/* Data streams */}
          <DataStream position={[-8, 0, -5]} height={15} />
          <DataStream position={[8, 0, -5]} height={15} />
          <DataStream position={[0, 0, -10]} height={20} />
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#050a14', 10, 60]} />
        </Suspense>
      </Canvas>
    </div>
  );
};
