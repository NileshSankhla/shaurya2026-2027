"use client";

import React, { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, PresentationControls, Float } from "@react-three/drei";
import * as THREE from "three";

function AnimatedLighting() {
  const lanternLightRef = useRef<THREE.PointLight>(null);
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    const time = elapsed.current;
    if (lanternLightRef.current) {
      lanternLightRef.current.intensity =
        5 + Math.sin(time * 5) * 2 + Math.cos(time * 8) * 1;
    }
    if (spotLightRef.current) {
      spotLightRef.current.position.x = Math.sin(time * 0.7) * 10;
      spotLightRef.current.position.z = 15 + Math.cos(time * 0.7) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={3.5} />
      <directionalLight
        position={[15, 30, 20]}
        intensity={6.5}
        color="#fff6e5"
        castShadow
      />
      <directionalLight
        position={[-15, 12, -15]}
        intensity={4}
        color="#ff6000"
      />
      <directionalLight
        position={[0, -10, 15]}
        intensity={2.5}
        color="#ffd166"
      />
      <pointLight
        ref={lanternLightRef}
        position={[2, 4, 4]}
        intensity={6}
        color="#ff8c00"
        distance={20}
      />
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

/* Normalizes the ship model: centers it at origin and scales so it fits in a ~5-unit sphere */
function Model() {
  const { scene, animations } = useGLTF("/ship.glb");
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (animations && animations.length > 0) {
      const mixer = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixer.clipAction(clip);
        action.play();
      });
      mixerRef.current = mixer;
    }
  }, [scene, animations]);

  /* On first mount, compute bounding box → center + scale */
  useEffect(() => {
    if (!groupRef.current) return;
    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 5; // normalize to ~5 world units
    const scale = targetSize / maxDim;

    groupRef.current.scale.setScalar(scale);
    // Re-center after scaling
    const scaledBox = new THREE.Box3().setFromObject(groupRef.current);
    const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
    groupRef.current.position.sub(scaledCenter);
  }, [scene]);

  useFrame((_, delta) => {
    if (mixerRef.current) mixerRef.current.update(delta);
  });

  return (
    <group ref={groupRef} rotation={[0, Math.PI / 4, 0]}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/ship.glb");

/* Auto-fit camera to scene contents after model loads */
function CameraFit() {
  const { camera, scene } = useThree();
  const fitted = useRef(false);

  useFrame(() => {
    if (fitted.current) return;
    // Wait until model children exist
    if (scene.children.length < 2) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim === 0 || !isFinite(maxDim)) return;

    const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180);
    let dist = maxDim / (2 * Math.tan(fov / 2));
    dist *= 1.35; // add some breathing room

    camera.position.set(center.x, center.y + 0.5, center.z + dist);
    camera.lookAt(center);
    camera.updateProjectionMatrix();
    fitted.current = true;
  });

  return null;
}

export default function ShipCanvas() {
  const [webglAvailable, setWebglAvailable] = React.useState<boolean | null>(
    null,
  );

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl");
    const frame = requestAnimationFrame(() =>
      setWebglAvailable(Boolean(context)),
    );
    return () => cancelAnimationFrame(frame);
  }, []);

  if (webglAvailable !== true) return null;

  return (
    <Canvas
      camera={{ position: [0, 2, 12], fov: 45 }}
      fallback={<div aria-hidden="true" />}
      style={{ width: "100%", height: "100%" }}
    >
      <AnimatedLighting />
      <CameraFit />

      <Suspense fallback={null}>
        <PresentationControls
          global={false}
          cursor={true}
          snap={true}
          speed={1.5}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 6, Math.PI / 6]}
          azimuth={[-Math.PI / 3, Math.PI / 3]}
        >
          <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.5}>
            <Model />
          </Float>
        </PresentationControls>
      </Suspense>
    </Canvas>
  );
}
