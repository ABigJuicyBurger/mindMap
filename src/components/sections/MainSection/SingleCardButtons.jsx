import styled from "styled-components";
import { useState } from "react";

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
      setTempMessage("At first lesson!");
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
      setTempMessage("At last lesson!");
      setTimeout(() => {
        setTempMessage("");
      }, 2000);
    }
  }

  return (
    <>
      <StyledMessage>
        {tempMessage ? (
          <p style={{ color: "red", textAlign: "center" }}>{tempMessage}</p>
        ) : null}
      </StyledMessage>
      <StyledButtons>
        <StyledButton onClick={goBackward}>Back</StyledButton>
        <p>
          {singleCardIndex + 1}/{totalLessons}
        </p>
        <StyledButton onClick={goForward}>Forward</StyledButton>
      </StyledButtons>
    </>
  );
}

const StyledMessage = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  gap: 2rem;
`;

const StyledButton = styled.button`
  width: 9rem;
  margin: 0 0.5rem;
`;
