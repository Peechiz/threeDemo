import {
  Center,
  Float,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import { Perf } from "r3f-perf";
import { useEffect, useRef } from "react";

import * as THREE from "three";

const torusGeometry = new THREE.TorusGeometry();
const matCapMaterial = new THREE.MeshMatcapMaterial();

const randPos = (spread = 80) => (Math.random() - 0.5) * spread;

export default function TextDemo3D() {
  const [matcapTexture] = useMatcapTexture("2E763A_78A0B7_B3D1CF_14F209", 256);
  const [matcap2] = useMatcapTexture("6C52AA_C9A6EA_A681D6_B494E2", 256);

  const donutGroup = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    donutGroup.current.children.forEach((donut) => {
      donut.rotation.x += delta / 2;
      donut.rotation.y += delta / 2;
    });
  });

  useEffect(() => {
    matcap2.colorSpace = THREE.SRGBColorSpace;
    matcap2.needsUpdate = true;

    matCapMaterial.matcap = matcap2;
    matCapMaterial.needsUpdate = true;
  }, []);

  const spread = 30;

  return (
    <>
      <color args={["#87cefa"]} attach="background" />
      {/* <Perf position="bottom-right" /> */}
      <OrbitControls makeDefault />
      <group ref={donutGroup}>
        {[...Array(100)].map((_val, index) => (
          <>
            <mesh
              material={matCapMaterial}
              geometry={torusGeometry}
              key={index}
              scale={0.4 + Math.random() * 0.2}
              position={[randPos(spread), randPos(spread), randPos(spread)]}
              rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
            />
          </>
        ))}
      </group>

      <Center>
        <Float>
          <Text3D
            size={0.75}
            height={0.2}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.02}
            bevelSize={0.02}
            position={[-4, 0, 1]}
            bevelOffset={0}
            bevelSegments={5}
            font="./fonts/helvetiker_regular.typeface.json"
          >
            Do you like donuts?
            <meshMatcapMaterial matcap={matcapTexture} />
          </Text3D>
        </Float>
      </Center>
    </>
  );
}
