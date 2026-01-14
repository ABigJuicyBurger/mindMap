import React, { useState, useMemo, Suspense, useEffect } from "react";
import styled from "styled-components";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Html,
  Environment,
  Sphere,
} from "@react-three/drei";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { topicListAtom, topicPositionsAtom } from "../store";
import * as THREE from "three";

const MODEL_PATH = "/models/brain_project.glb";

// --- Components ---

function NodeMarker({ position, topic, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <Sphere
        args={[0.1, 32, 32]}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <meshStandardMaterial
          color={hovered ? "#ff0055" : "black"}
          emissive={hovered ? "#ff0055" : "#00aaff"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      {hovered && (
        <Html
          position={[0, 0.2, 0]}
          center
          style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
        >
          <Tooltip>{topic}</Tooltip>
        </Html>
      )}
    </group>
  );
}

function BrainModel() {
  const { scene } = useGLTF(MODEL_PATH);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group name="brainGroup">
      <primitive object={clonedScene} scale={4} position={[0, -2.2, 0]} />
    </group>
  );
}

function DragManager({ draggingTopic, setDraggingTopic, setTopicPositions }) {
  const { camera, scene, raycaster, pointer } = useThree();

  useEffect(() => {
    const handleWindowUp = () => {
      if (!draggingTopic) return;

      // Update raycaster with the current pointer position
      raycaster.setFromCamera(pointer, camera);

      // We only want to intersect with the brain model
      const brainGroup = scene.getObjectByName("brainGroup");

      if (brainGroup) {
        const intersects = raycaster.intersectObjects(
          brainGroup.children,
          true
        );

        // Find the first hit that is a Mesh
        const hit = intersects.find((i) => i.object.isMesh);

        if (hit) {
          setTopicPositions((prev) => ({
            ...prev,
            [draggingTopic]: [hit.point.x, hit.point.y, hit.point.z],
          }));
        }
      }

      setDraggingTopic(null);
    };

    // We add the listener to the window to catch drops anywhere,
    // but the logic inside checks raycaster intersection which relies on mouse position over canvas
    window.addEventListener("pointerup", handleWindowUp);

    return () => {
      window.removeEventListener("pointerup", handleWindowUp);
    };
  }, [
    draggingTopic,
    camera,
    scene,
    raycaster,
    pointer,
    setDraggingTopic,
    setTopicPositions,
  ]);

  return null;
}

export function BrainPage() {
  const [topics] = useAtom(topicListAtom);
  const [positions, setPositions] = useAtom(topicPositionsAtom);
  const [draggingTopic, setDraggingTopic] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const navigate = useNavigate();

  // Determine which topics are not yet placed
  const unplacedTopics = topics.filter((t) => !positions[t]);

  return (
    <PageContainer>
      <ContentArea>
        <HeaderRow>
          <Title>Brain Mode</Title>
          <InstructionText>
            Drag topics to place them on the brain
          </InstructionText>
        </HeaderRow>

        {/* Top Palette for Unplaced Topics */}
        <PaletteContainer>
          {unplacedTopics.length > 0 ? (
            unplacedTopics.map((topic) => (
              <PaletteItem
                key={topic}
                onPointerDown={() => setDraggingTopic(topic)}
                style={{
                  opacity: draggingTopic === topic ? 0.5 : 1,
                  transform:
                    draggingTopic === topic ? "scale(0.95)" : "scale(1)",
                }}
              >
                {topic}
              </PaletteItem>
            ))
          ) : (
            <PlaceholderText style={{ fontSize: "0.9rem", margin: 0 }}>
              All topics placed! Click a node to visit.
            </PlaceholderText>
          )}
        </PaletteContainer>

        <BrainContainer>
          <Canvas
            frameloop="demand"
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => {
              // Ensure canvas receives pointer events nicely
              gl.domElement.style.touchAction = "none";
            }}
          >
            <Suspense
              fallback={
                <Html center>
                  <PlaceholderText>Loading 3D Model...</PlaceholderText>
                </Html>
              }
            >
              <DragManager
                draggingTopic={draggingTopic}
                setDraggingTopic={setDraggingTopic}
                setTopicPositions={setPositions}
              />

              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={0.5} />
              <directionalLight position={[-5, -5, -5]} intensity={0.2} />
              <Environment preset="apartment" />

              <BrainModel />

              {Object.entries(positions).map(([topic, pos]) => (
                <NodeMarker
                  key={topic}
                  topic={topic}
                  position={pos}
                  onClick={() => setSelectedNode(topic)}
                />
              ))}

              <OrbitControls
                enableZoom={false}
                makeDefault
                enabled={!draggingTopic} // Disable rotation while dragging to prevent confusion
              />
            </Suspense>
          </Canvas>
        </BrainContainer>
      </ContentArea>

      {/* Confirmation Modal */}
      {selectedNode && (
        <ModalOverlay onClick={() => setSelectedNode(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalTitle>{selectedNode}</ModalTitle>
            <ModalText>
              Do you want to go to the lessons for this topic?
            </ModalText>
            <ButtonGroup>
              <ConfirmButton
                onClick={() => navigate(`/lessons/${selectedNode}`)}
              >
                Yes, let's go
              </ConfirmButton>
              <CancelButton onClick={() => setSelectedNode(null)}>
                Cancel
              </CancelButton>
            </ButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
}

// --- Styled Components ---

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
`;

const ContentArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const HeaderRow = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: var(--text-primary);
  margin: 0;
`;

const InstructionText = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const PaletteContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  min-height: 50px;
  width: 90%;
  max-width: 600px;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const PaletteItem = styled.div`
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  cursor: grab;
  user-select: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: transform 0.1s;

  &:active {
    cursor: grabbing;
    transform: scale(0.95);
  }
`;

const BrainContainer = styled.div`
  width: 80vw;
  height: 60vh;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  @keyframes popIn {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const ModalTitle = styled.h2`
  margin: 0 0 1rem 0;
  color: #333;
`;

const ModalText = styled.p`
  color: #666;
  margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const ConfirmButton = styled(Button)`
  background: #6e8efb;
  color: white;
`;

const CancelButton = styled(Button)`
  background: #f0f0f0;
  color: #333;
`;
