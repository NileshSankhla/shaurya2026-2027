"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Bounds, PresentationControls, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedLighting() {
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    // Pulsing deck lantern light flickering
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity = 5 + Math.sin(time * 5) * 2 + Math.cos(time * 8) * 1;
    }
    // Dynamic sweeping spotlight over sails
    if (spotLightRef.current) {
      spotLightRef.current.position.x = Math.sin(time * 0.7) * 10;
      spotLightRef.current.position.z = 15 + Math.cos(time * 0.7) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={3.5} />
      {/* Sun / Key Light */}
      <directionalLight position={[15, 30, 20]} intensity={6.5} color="#fff6e5" castShadow />
      {/* Orange Rim Light */}
      <directionalLight position={[-15, 12, -15]} intensity={4} color="#ff6000" />
      {/* Underglow */}
      <directionalLight position={[0, -10, 15]} intensity={2.5} color="#ffd166" />

      {/* Animated Flickering Lantern */}
      <pointLight ref={lanternLightRef} position={[2, 4, 4]} intensity={6} color="#ff8c00" distance={20} />

      {/* Dynamic Animated Sweeping Spotlight */}
      <spotLight
        ref={spotLightRef}
        position={[0, 18, 14]}
        angle={0.45}
        penumbra={0.8}
        intensity={6}
        color="#ffe599"
      />
    </>
  );
}

function Model() {
  const { scene, animations } = useGLTF("/ship.glb");
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  React.useEffect(() => {
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
      mixerRef.current = mixer;
    }
  }, [scene, animations]);

  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
  });

  const thirtyDegInRad = (45 * Math.PI) / 180;

  return (
    <primitive
      object={scene}
      rotation={[0, thirtyDegInRad, 0]}
    />
  );
}

useGLTF.preload("/ship.glb");

export default function ShipCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 20], fov: 45 }}
      style={{ width: "100%", height: "100%" }}
    >
      <AnimatedLighting />

      <Suspense fallback={null}>
        <PresentationControls
          global={false}
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Bounds fit clip margin={0.75}>
            <Center>
              {/* Floating ocean wave buoyancy animation */}
              <Float
                speed={2.2} // Floating animation speed
                rotationIntensity={0.6} // Pitch and roll rocking
                floatIntensity={0.5} // Vertical ocean wave bobbing
              >
                <Model />
              </Float>
            </Center>
          </Bounds>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}
