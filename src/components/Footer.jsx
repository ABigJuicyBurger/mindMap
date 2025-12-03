import styled from "styled-components";

export function Footer() {
  return (
    <StyledFooter>
      Made by <a href="https://github.com/ABigJuicyBurger">Bader Muhssin</a>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  display: flex;
  padding: 2rem;
  width: 100%;
  border-top: 1px dotted lightsteelblue;

  a {
    margin: 0 0.5rem;
  }
`;
