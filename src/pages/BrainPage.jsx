import React, { useState, useMemo, Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { topicListAtom } from "../store";

const MODEL_PATH = "/models/brain_project.glb";

function Model({ topics, navigate }) {
  const { scene } = useGLTF(MODEL_PATH);

  // Clone the scene
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  const [hovered, setHovered] = useState(null);

  const meshes = useMemo(() => {
    const m = [];
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        m.push(child);
      }
    });
    return m;
  }, [clonedScene]);

  return (
    <group>
      <primitive
        object={clonedScene}
        scale={2}
        onClick={(e) => {
          e.stopPropagation();
          const index = meshes.indexOf(e.object);
          if (index !== -1 && index < topics.length) {
            navigate(`/lessons/${topics[index]}`);
          }
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          const index = meshes.indexOf(e.object);
          if (index !== -1 && index < topics.length) {
            setHovered({
              topic: topics[index],
              position: [e.point.x, e.point.y, e.point.z],
            });
            document.body.style.cursor = "pointer";
          }
        }}
        onPointerOut={() => {
          setHovered(null);
          document.body.style.cursor = "auto";
        }}
      />
      {hovered && (
        <Html position={hovered.position} center distanceFactor={12}>
          <Tooltip>{hovered.topic}</Tooltip>
        </Html>
      )}
    </group>
  );
}

export function BrainPage() {
  const [topics] = useAtom(topicListAtom);
  const navigate = useNavigate();

  return (
    <PageContainer>
      <ContentArea>
        <Title>Brain Mode</Title>
        <BrainContainer>
          <Canvas
            frameloop="demand"
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={1}
            gl={{
              antialias: false, // Disabled antialias for extra performance
              alpha: true,
              powerPreference: "default",
            }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener(
                "webglcontextlost",
                (event) => {
                  event.preventDefault();
                },
                false
              );
            }}
          >
            <Suspense
              fallback={
                <Html>
                  <PlaceholderText>Loading 3D Model...</PlaceholderText>
                </Html>
              }
            >
              <ambientLight intensity={1} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <Model topics={topics} navigate={navigate} />
              <OrbitControls enableZoom={true} makeDefault />
            </Suspense>
          </Canvas>
        </BrainContainer>
      </ContentArea>
    </PageContainer>
  );
}

// useGLTF.preload(MODEL_PATH);

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  flex: 1;
  width: inherit;
`;

const ContentArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: 2rem;
`;

const BrainContainer = styled.div`
  width: 100%;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const PlaceholderText = styled.p`
  color: var(--text-secondary);
  font-size: 1.2rem;
  text-align: center;
`;

const Tooltip = styled.div`
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  pointer-events: none;
  font-size: 0.85rem;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;
