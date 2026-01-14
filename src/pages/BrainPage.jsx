import React, { useState, useMemo, Suspense, useEffect, useRef } from "react";
import styled from "styled-components";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html, Environment } from "@react-three/drei";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { topicListAtom, topicPositionsAtom } from "../store";
import * as THREE from "three";

const MODEL_PATH = "/models/brain_project.glb";

// --- Components ---

function PinShape({ color, opacity = 1, isHovered }) {
  // Visual tweaks:
  // We want the tip to be at (0,0,0).
  // The pin extends along the +Y axis.
  const scale = 1.3;

  return (
    <group scale={scale}>
      <mesh position={[0, 0.09, 0]}></mesh>

      <mesh position={[0, 0.0, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.04, 0.18, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.1}
        />
      </mesh>

      {/* Pin Head - Sphere on top of the base */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isHovered ? 0.8 : 0.4}
          transparent
          opacity={opacity}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

function NodeMarker({
  positionData,
  topic,
  navigate,
  setDraggingTopic,
  removeTopic,
  isDragging,
}) {
  const [hovered, setHovered] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const groupRef = useRef();
  const visualGroupRef = useRef();

  // Drag detection
  const isPressed = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });

  // Parse position data.
  // It could be [x, y, z] (legacy) or { position: [x,y,z], normal: [nx,ny,nz] }
  const pos = Array.isArray(positionData)
    ? positionData
    : positionData.position;
  const norm =
    !Array.isArray(positionData) && positionData.normal
      ? positionData.normal
      : [0, 1, 0];

  useEffect(() => {
    if (groupRef.current) {
      // Orient the group to align +Y with the normal
      const up = new THREE.Vector3(0, 1, 0);
      const targetNormal = new THREE.Vector3(...norm);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        up,
        targetNormal
      );
      groupRef.current.setRotationFromQuaternion(quaternion);
    }
  }, [norm]);

  useFrame(() => {
    if (visualGroupRef.current) {
      // Elevate along the LOCAL Y axis (which is aligned to normal now)
      // Base offset 0 (touching surface)
      const targetY = hovered ? 0.1 : 0;
      visualGroupRef.current.position.y +=
        (targetY - visualGroupRef.current.position.y) * 0.2;
    }
  });

  if (isDragging) return null;

  return (
    <group ref={groupRef} position={pos}>
      {/* Interaction Hitbox - Stationary relative to the group, but group is oriented */}
      <mesh
        visible={false}
        position={[0, 0.15, 0]}
        onPointerDown={(e) => {
          e.stopPropagation();
          e.target.setPointerCapture(e.pointerId);
          isPressed.current = true;
          startPos.current = { x: e.pointer.x, y: e.pointer.y };
        }}
        onPointerMove={(e) => {
          if (isPressed.current) {
            const dx = e.pointer.x - startPos.current.x;
            const dy = e.pointer.y - startPos.current.y;
            if (Math.sqrt(dx * dx + dy * dy) > 0.02) {
              isPressed.current = false;
              e.target.releasePointerCapture(e.pointerId);
              setDraggingTopic(topic);
              setShowPopover(false);
            }
          }
        }}
        onPointerUp={(e) => {
          if (isPressed.current) {
            e.stopPropagation();
            setShowPopover(!showPopover);
            e.target.releasePointerCapture(e.pointerId);
            isPressed.current = false;
          }
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
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <group ref={visualGroupRef}>
        <PinShape color={hovered ? "#ff0088" : "#00ddee"} isHovered={hovered} />
      </group>

      {/* Popover - rotate it back to face camera? 
          Html component automatically faces camera by default unless transform is applied?
          Html inside a rotated group will move with it. 
          We might want it slightly offset "up" (along normal).
      */}
      {(showPopover || hovered) && !isDragging && (
        <Html position={[0, 0.5, 0]} center zIndexRange={[100, 0]}>
          {showPopover ? (
            <PopoverContainer>
              <PopoverTitle>{topic}</PopoverTitle>
              <PopoverButton onClick={() => navigate(`/lessons/${topic}`)}>
                Go to Lesson
              </PopoverButton>
              <PopoverRemoveButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeTopic(topic);
                  setShowPopover(false);
                }}
              >
                Remove Pin
              </PopoverRemoveButton>
              <PopoverClose
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopover(false);
                }}
              >
                Close
              </PopoverClose>
            </PopoverContainer>
          ) : (
            <TooltipLabel>{topic}</TooltipLabel>
          )}
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
  const [dragInfo, setDragInfo] = useState(null); // { pos: [x,y,z], norm: [x,y,z] }

  useFrame(() => {
    if (!draggingTopic) {
      if (dragInfo) setDragInfo(null);
      return;
    }

    raycaster.setFromCamera(pointer, camera);
    const brainGroup = scene.getObjectByName("brainGroup");

    if (brainGroup) {
      const intersects = raycaster.intersectObjects(brainGroup.children, true);
      const hit = intersects.find((i) => i.object.isMesh);

      if (hit) {
        // Calculate World Normal
        // hit.face.normal is in object space (usually)
        // We need to transform it by the object's world rotation matrix (normal matrix)
        const normalMatrix = new THREE.Matrix3().getNormalMatrix(
          hit.object.matrixWorld
        );
        const worldNormal = hit.face.normal
          .clone()
          .applyMatrix3(normalMatrix)
          .normalize();

        setDragInfo({
          position: [hit.point.x, hit.point.y, hit.point.z],
          normal: [worldNormal.x, worldNormal.y, worldNormal.z],
        });
      } else {
        setDragInfo(null);
      }
    }
  });

  useEffect(() => {
    const handleWindowUp = () => {
      if (!draggingTopic) return;

      if (dragInfo) {
        setTopicPositions((prev) => ({
          ...prev,
          [draggingTopic]: {
            position: dragInfo.position,
            normal: dragInfo.normal,
          },
        }));
      }

      setDraggingTopic(null);
      setDragInfo(null);
    };

    window.addEventListener("pointerup", handleWindowUp);
    return () => window.removeEventListener("pointerup", handleWindowUp);
  }, [draggingTopic, dragInfo, setDraggingTopic, setTopicPositions]);

  // Ghost Pin during drag
  // Needs to be oriented too
  const ghostRef = useRef();
  useEffect(() => {
    if (ghostRef.current && dragInfo) {
      const up = new THREE.Vector3(0, 1, 0);
      const targetNormal = new THREE.Vector3(...dragInfo.normal);
      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        up,
        targetNormal
      );
      ghostRef.current.setRotationFromQuaternion(quaternion);
    }
  }, [dragInfo]);

  return (
    <>
      {draggingTopic && dragInfo && (
        <group position={dragInfo.position} ref={ghostRef}>
          <PinShape color="#ffff00" opacity={0.7} isHovered={false} />
          <Html position={[0, 0.4, 0]} center>
            <TooltipLabel
              style={{ background: "rgba(255, 255, 0, 0.8)", color: "black" }}
            >
              Drop here
            </TooltipLabel>
          </Html>
        </group>
      )}
    </>
  );
}

export function BrainPage() {
  const [topics] = useAtom(topicListAtom);
  const [positions, setPositions] = useAtom(topicPositionsAtom);
  const [draggingTopic, setDraggingTopic] = useState(null);
  const navigate = useNavigate();

  // Determine which topics are not yet placed
  const unplacedTopics = topics.filter((t) => !positions[t]);

  const removeTopic = (topic) => {
    setPositions((prev) => {
      const next = { ...prev };
      delete next[topic];
      return next;
    });
  };

  return (
    <PageContainer>
      <ContentArea>
        <HeaderRow>
          <Title>Brain Mode</Title>
          <InstructionText>
            Drag topics to place them on the brain
          </InstructionText>
        </HeaderRow>

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
                  background:
                    draggingTopic === topic
                      ? "#888"
                      : "linear-gradient(135deg, #6e8efb, #a777e3)",
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
            frameloop="always"
            camera={{ position: [0, 0, 8], fov: 50 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            onCreated={({ gl }) => {
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

              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.5} />
              <directionalLight position={[-5, -5, -5]} intensity={0.3} />
              <Environment preset="city" />

              <BrainModel />

              {Object.entries(positions).map(([topic, posData]) => (
                <NodeMarker
                  key={topic}
                  topic={topic}
                  positionData={posData}
                  navigate={navigate}
                  setDraggingTopic={setDraggingTopic}
                  removeTopic={removeTopic}
                  isDragging={draggingTopic === topic}
                />
              ))}

              <OrbitControls
                enableZoom={false}
                makeDefault
                enabled={!draggingTopic}
                minDistance={4}
                maxDistance={15}
              />
            </Suspense>
          </Canvas>
        </BrainContainer>
      </ContentArea>
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
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: 500;
  cursor: grab;
  user-select: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s;

  &:active {
    cursor: grabbing;
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

const TooltipLabel = styled.div`
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  pointer-events: none;
`;

const PopoverContainer = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-width: 140px;
  text-align: center;
  border: 1px solid #ddd;
`;

const PopoverTitle = styled.div`
  font-weight: bold;
  color: #333;
  font-size: 0.9rem;
  margin-bottom: 4px;
`;

const PopoverButton = styled.button`
  background: #00ddee;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  &:hover {
    background: #00cce0;
  }
`;

const PopoverRemoveButton = styled.button`
  background: #ff4444;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  &:hover {
    background: #dd3333;
  }
`;

const PopoverClose = styled.button`
  background: transparent;
  color: #999;
  border: none;
  font-size: 0.7rem;
  cursor: pointer;
  text-decoration: underline;
  &:hover {
    color: #666;
  }
`;
