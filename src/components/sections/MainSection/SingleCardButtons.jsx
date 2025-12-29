import styled from "styled-components";

export function SingleCardButtons() {
  return (
    <StyledButtons>
      <StyledButton>Back</StyledButton>
      <StyledButton>Forward</StyledButton>
    </StyledButtons>
  );
}

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  width: 9rem;
  margin: 0 0.5rem;
`;
