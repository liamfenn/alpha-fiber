import React from 'react';
import { Text, Plane } from '@react-three/drei';

const PatientMonitor = ({ position }) => {
  const monitorWidth = 2;
  const monitorHeight = 1.5;

  return (
    <group position={position}>
      {/* Monitor screen */}
      <Plane args={[monitorWidth, monitorHeight]} position={[0, 0, 0.01]}>
        <meshBasicMaterial color="black" />
      </Plane>

      {/* Monitor frame */}
      <Plane args={[monitorWidth + 0.1, monitorHeight + 0.1]} position={[0, 0, 0]}>
        <meshBasicMaterial color="gray" />
      </Plane>

      {/* Vital signs */}
      <Text
        position={[-0.8, 0.5, 0.02]}
        color="green"
        fontSize={0.15}
        anchorX="left"
        anchorY="top"
      >
        Heart Rate: 80 bpm
      </Text>
      <Text
        position={[-0.8, 0.2, 0.02]}
        color="cyan"
        fontSize={0.15}
        anchorX="left"
        anchorY="top"
      >
        Blood Pressure: 120/80 mmHg
      </Text>
      <Text
        position={[-0.8, -0.1, 0.02]}
        color="yellow"
        fontSize={0.15}
        anchorX="left"
        anchorY="top"
      >
        Oxygen Saturation: 92%
      </Text>
      <Text
        position={[-0.8, -0.4, 0.02]}
        color="white"
        fontSize={0.15}
        anchorX="left"
        anchorY="top"
      >
        Temperature: 38.5°C
      </Text>
    </group>
  );
};

export default PatientMonitor;

