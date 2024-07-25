import {
  Environment,
  Lightformer,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import TV from "./TV";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function TVthing() {
  const [green] = useMatcapTexture("2E763A_78A0B7_B3D1CF_14F209", 256);
  const [brown] = useMatcapTexture("7B5254_E9DCC7_B19986_C8AC91", 256);
  const [pink] = useMatcapTexture("89204B_17080D_DA4377_F780B5", 256);
  const [bronze] = useMatcapTexture("713A28_A87661_3A160D_9B6454", 256);

  const { lightDist, ambient, showBackground, perf } = useControls("Env", {
    showBackground: false,
    lightDist: { value: 3, min: 1, max: 20 },
    ambient: { value: 1, min: 0, max: 10 },
    perf: false,
  });

  const { textPosition, textRotation } = useControls("Text1", {
    textPosition: { value: [-5.7, 0, 3.7], step: 0.1 },
    textRotation: { value: [0, 0.6, 0], step: 0.1 },
  });

  const { towerRotation } = useControls("Tower", {
    towerRotation: { value: [0, 0, 0], step: 0.1 },
  });

  return (
    <>
      <OrbitControls />
      {perf && <Perf position="bottom-right" />}
      <Environment
        background={showBackground}
        preset="city"
        environmentIntensity={ambient}
      >
        <Lightformer
          position-x={-lightDist}
          rotation-y={Math.PI * 0.5}
          scale={10}
          color={"red"}
          intensity={3}
        />
        <Lightformer
          position-x={lightDist}
          rotation-y={Math.PI * 0.5}
          scale={10}
          color={"blue"}
          intensity={3}
        />
      </Environment>
      <color args={["#222"]} attach={"background"} />
      <group rotation={towerRotation}>
        <TV
          screenTexture={bronze}
          position={[0, 15, 0]}
          rotation-y={Math.PI * -0.1}
        />
        <TV
          screenTexture={pink}
          position={[0, 10, 0]}
          rotation-y={Math.PI * -0.2}
        />
        <TV
          screenTexture={brown}
          position={[0, 5, 0]}
          rotation-y={Math.PI * 0.1}
        />
        <TV screenTexture={green} />
        <Text3D
          position={textPosition}
          rotation={textRotation}
          font="./fonts/helvetiker_regular.typeface.json"
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          letterSpacing={0.14}
        >
          I modeled these TVs from scratch
          <meshMatcapMaterial matcap={green} />
        </Text3D>
      </group>
    </>
  );
}
