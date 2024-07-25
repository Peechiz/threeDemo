import {
  ContactShadows,
  Environment,
  Float,
  Html,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import { useState } from "react";

const buttonStyle = {
  fontSize: "1.2em",
  padding: 10,
  borderRadius: 30,
  backgroundColor: "lightblue",
  cursor: "pointer",
};

export default function PortfolioDemo() {
  const [color, setColor] = useState("teal");
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );

  const onClick = () => {
    setColor(`hsl(${Math.random() * 360}, 100%, 50%)`);
  };

  return (
    <>
      <Environment preset="city" />
      <color args={["#241a1a"]} attach="background" />
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={color}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive position-y={-1.2} object={computer.scene}>
            <Html
              position={[0, 1.56, -1.4]}
              rotation-x={-0.256}
              transform
              distanceFactor={1.17}
            >
              <div
                style={{
                  backgroundColor: color,
                  padding: "1em",
                  width: 1010,
                  height: 670,
                  borderRadius: 20,
                  display: "grid",
                  placeItems: "center",
                  overflow: "scroll",
                }}
              >
                <div
                  style={{
                    fontSize: "3em",
                    fontFamily: "helvetica",
                    color: "white",
                    textAlign: "center",
                    paddingTop: "2em",
                    display: "flex",
                    flexDirection: "column",
                    padding: "2em 0",
                    gap: "10em",
                  }}
                >
                  <div>
                    <h1>Chris Impicciche</h1>
                    <h3>
                      Built this for <em>Inkovate 💡</em>
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1em",
                    }}
                  >
                    <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2c3MjR4dm52azVrcnYweHlpODl5NDY2eHNmb201ejBtd2c5aW01ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lXu72d4iKwqek/giphy.gif" />
                    <button onClick={onClick} style={buttonStyle}>
                      WOW
                    </button>
                    {/* <button onClick={onClick} style={buttonStyle}>
                      COOL
                    </button> */}
                  </div>
                </div>
              </div>
            </Html>
          </primitive>
        </Float>
      </PresentationControls>
      <ContactShadows opacity={0.4} blur={2.4} position-y={-1.4} />
    </>
  );
}
