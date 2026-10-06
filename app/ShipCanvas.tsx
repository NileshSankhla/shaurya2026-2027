"use client";

import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, Bounds, PresentationControls } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/pirate_ship.glb");
  const thirtyDegInRad = (27 * Math.PI) / 180;

  return (
    <primitive
      object={scene}
      rotation={[0, thirtyDegInRad, 0]}
    />
  );
}

useGLTF.preload("/pirate_ship.glb");

export default function ShipCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Super Bright Dramatic Lighting Setup */}
      <ambientLight intensity={4.5} />
      <directionalLight position={[15, 30, 20]} intensity={7} color="#ffffff" />
      <directionalLight position={[-15, 12, -15]} intensity={4} color="#ffa500" />
      <directionalLight position={[0, -10, 15]} intensity={2.5} color="#ffd166" />
      <pointLight position={[5, 8, 8]} intensity={6} color="#ffb703" />
      <pointLight position={[-5, 5, 5]} intensity={4} color="#ffffff" />

      <Suspense fallback={null}>
        {/* PresentationControls enables user drag-to-rotate with spring snap-back to original position */}
        <PresentationControls
          global={false}
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]} // Vertical tilt limits
          azimuth={[-Math.PI / 2, Math.PI / 2]} // Horizontal rotation limits
        >
          <Bounds fit clip margin={1.0}>
            <Center>
              <Model />
            </Center>
          </Bounds>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}
