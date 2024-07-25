import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

type TVProps = JSX.IntrinsicElements["group"] & {
  boxTexture?: THREE.Texture;
  screenTexture?: THREE.Texture;
};

export default function TV(props: TVProps) {
  const { nodes, materials } = useGLTF("./CRT.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.TV as any).geometry}
        material={props.boxTexture ? undefined : materials.TVMaterial}
      >
        {props.boxTexture && <meshMatcapMaterial matcap={props.boxTexture} />}
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Knob1 as any).geometry}
          material={materials.Knob}
          position={[-1.847, -2.43, 2.179]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.132, 0.025, 0.132]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Knob2 as any).geometry}
          material={materials.Knob}
          position={[-1.512, -2.43, 2.179]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[0.132, 0.025, 0.132]}
        />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={(nodes.Screen as any).geometry}
        material={props.screenTexture ? undefined : materials.Screen}
        // material={materials.Screen}
      >
        {props.screenTexture && (
          <meshMatcapMaterial matcap={props.screenTexture} />
        )}
        {/* <meshStandardMaterial
          emissive={"blue"}
          emissiveIntensity={10}
          color={"blue"}
        /> */}
      </mesh>
    </group>
  );
}

useGLTF.preload("/CRT.glb");
