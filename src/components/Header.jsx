import styled from "styled-components";

export function Header() {
  return (
    <StyledHeader>
      <h1 className="title">MindMap</h1>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  padding: 2rem;
  width: 100%;

  .title {
    color: papayawhip;
  }
`;

// import styled then styled.elementName then backtick `` and isolate CSS
