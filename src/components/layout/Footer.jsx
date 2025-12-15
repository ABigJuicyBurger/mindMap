import styled from "styled-components";

export function Footer() {
  return (
    <StyledFooter>
      Made by <a href="https://github.com/ABigJuicyBurger">Bader Muhssin</a>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  color: papayawhip;
  display: flex;
  padding: 1.5rem;
  width: 100%;
  /* border-top: 1px dotted lightsteelblue; */

  a {
    text-decoration: none;
    color: inherit;
    margin: 0 0.5rem;
  }

  a:hover {
    color: lightsteelblue;
    text-decoration: underline;
  }
`;
