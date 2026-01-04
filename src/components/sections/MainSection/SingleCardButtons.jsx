import styled from "styled-components";
import { useState } from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";

export function SingleCardButtons({
  setSingleCardIndex,
  singleCardIndex,
  totalLessons,
}) {
  const [tempMessage, setTempMessage] = useState("");

  function goBackward() {
    if (singleCardIndex > 0) {
      setTempMessage("");
      setSingleCardIndex(singleCardIndex - 1);
    } else {
      setTempMessage("First lesson");
      setTimeout(() => {
        setTempMessage("");
      }, 2000);
    }
  }

  function goForward() {
    if (singleCardIndex < totalLessons - 1) {
      setTempMessage("");
      setSingleCardIndex(singleCardIndex + 1);
    } else {
      setTempMessage("Last lesson");
      setTimeout(() => {
        setTempMessage("");
      }, 2000);
    }
  }

  return (
    <Container>
      {tempMessage && <ToastMessage>{tempMessage}</ToastMessage>}
      
      <Controls>
        <NavButton onClick={goBackward} aria-label="Previous Lesson">
           <RiArrowLeftLine size={24} />
        </NavButton>
        
        <Counter>
          <span className="current">{singleCardIndex + 1}</span>
          <span className="divider">/</span>
          <span className="total">{totalLessons}</span>
        </Counter>
        
        <NavButton onClick={goForward} aria-label="Next Lesson">
           <RiArrowRightLine size={24} />
        </NavButton>
      </Controls>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 1.5rem;
  position: relative;
`;

const ToastMessage = styled.div`
  position: absolute;
  top: -2.5rem;
  background-color: var(--button-bg);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  opacity: 0.9;
  animation: fadeIn 0.2s ease-out;
  
  @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 0.9; transform: translateY(0); }
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: var(--card-bg);
  padding: 0.5rem 1rem;
  border-radius: 3rem;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
`;

const NavButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: none;
  margin: 0;

  &:hover {
    background-color: rgba(0,0,0,0.05);
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Counter = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-family: monospace; /* or tabular-nums */
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  
  .divider {
      color: var(--text-secondary);
      font-weight: 400;
      font-size: 0.9rem;
  }
  
  .total {
      color: var(--text-secondary);
      font-size: 0.9rem;
  }
`;
