// import { OrbitControls, useHelper } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";

export default function PhysicsDemo() {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const cube = useRef<any>(null!);
  // useHelper(lightRef, THREE.DirectionalLightHelper);

  const bounceCube = () => {
    cube.current.applyImpulse({ x: 0, y: 5, z: 0 });
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight
        ref={lightRef}
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
      />
      <ambientLight intensity={1.5} />

      <Physics>
        {/* SPHERE */}
        <RigidBody colliders="ball" restitution={1.5}>
          <mesh castShadow position={[-2, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color={"orange"} />
          </mesh>
        </RigidBody>

        {/* CUBE */}
        <RigidBody ref={cube} restitution={0.5}>
          <mesh
            castShadow
            onClick={bounceCube}
            rotation-y={Math.PI * 0.25}
            position={[2, 0, 0]}
          >
            <boxGeometry />
            <meshStandardMaterial color={"mediumpurple"} />
          </mesh>
        </RigidBody>

        {/* FLOOR */}
        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color={"greenyellow"} />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
}
