import styled from "styled-components";

export function Header() {
  return (
    <StyledHeader>
      <h1 className="title">MindMap</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 1rem;
  width: 100%;
  /* border-bottom: 1px dotted lightsteelblue; */

  .title {
    color: var(--text-primary);
    font-size: 2.5rem;
    font-weight: 700;
    font-family: serif; /* Matches the 'Home' font style in the image */
    font-style: italic;
    margin: 0;
  }
`;

// import styled then styled.elementName then backtick `` and isolate CSS
