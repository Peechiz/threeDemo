import { OrbitControls, PivotControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function MouseDemo() {
  const cube = useRef<THREE.Mesh>(null!);
  const sphere = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const onClick = (obj: any) => {
    obj.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`);
  };

  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={1.5} />

      {/* SPHERE */}
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh ref={sphere} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </PivotControls>

      {/* CUBE */}
      <mesh
        ref={cube}
        rotation-y={Math.PI * 0.25}
        position={[2, 0, 0]}
        scale={1.5}
        onClick={() => onClick(cube)}
      >
        <boxGeometry />
        <meshStandardMaterial color={"mediumpurple"} />
      </mesh>

      {/* FLOOR */}
      <mesh position-y={-1} scale={10} rotation-x={-Math.PI * 0.5}>
        <planeGeometry />
        <meshStandardMaterial color={"greenyellow"} />
      </mesh>
    </>
  );
}
