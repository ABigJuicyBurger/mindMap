import styled from "styled-components";

export function Header() {
  return (
    <StyledHeader>
      <h1 className="title">MindMap</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 1.5rem 2rem;
  width: 100%;
  /* border-bottom: 1px dotted lightsteelblue; */
  display: flex;
  justify-content: center; /* Center the content if the app is centered */
  
  @media (min-width: 768px) {
    justify-content: flex-start; /* Align left on larger screens if desired, or keep centered */
    padding-left: 3rem; /* Match typical page margins */
  }

  .title {
    color: var(--text-primary);
    font-size: 2.5rem;
    font-weight: 700;
    /* font-family: serif; Removed to match global font */
    /* font-style: italic; Removed for consistency */
    margin: 0;
    letter-spacing: -0.5px; /* Slight tightening for modern look */
  }
`;

// import styled then styled.elementName then backtick `` and isolate CSS
