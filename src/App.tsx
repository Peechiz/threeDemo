import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

import TextDemo3D from "./components/3dTextDemo";
import MouseDemo from "./components/mouseDemo";
import PortfolioDemo from "./components/portfolioDemo";
import PhysicsDemo from "./components/physicsDemo";
import TVthing from "./components/tvThing";
import { useState } from "react";

type Nav = "Mouse" | "Float" | "Physics" | "Laptop" | "TVs";

function App() {
  const [nav, setNav] = useState<Nav>("Mouse");

  const navigate = (e: any) => {
    setNav(e.target.dataset.nav as Nav);
  };

  return (
    <>
      <Canvas
        className="r3f"
        gl={{ antialias: true, outputColorSpace: THREE.SRGBColorSpace }}
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [-3, 3, 8],
        }}
        shadows
      >
        {nav === "Mouse" && <MouseDemo />}
        {nav === "Float" && <TextDemo3D />}
        {nav === "Physics" && <PhysicsDemo />}
        {nav === "Laptop" && <PortfolioDemo />}
        {nav === "TVs" && <TVthing />}
      </Canvas>

      <div className="header">
        <ul>
          <li data-nav="Mouse" onClick={navigate}>
            Mouse Clicks
          </li>
          <li data-nav="Float" onClick={navigate}>
            Floating Text
          </li>
          <li data-nav="Physics" onClick={navigate}>
            Physics Simulation
          </li>
          <li data-nav="Laptop" onClick={navigate}>
            Laptop
          </li>
          <li data-nav="TVs" onClick={navigate}>
            TVs
          </li>
        </ul>
      </div>
    </>
  );
}

export default App;
