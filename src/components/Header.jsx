import styled from "styled-components";

export function Header() {
  return (
    <StyledHeader>
      <h1 className="title">MindMap</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 1.5rem;
  width: 100%;
  /* border-bottom: 1px dotted lightsteelblue; */

  .title {
    color: papayawhip;
  }
`;

// import styled then styled.elementName then backtick `` and isolate CSS
