import styled from "styled-components";

export function Footer() {
  return (
    <StyledFooter>
      Made by <a href="https://github.com/ABigJuicyBurger">Bader Muhssin</a>
    </StyledFooter>
  );
}

const StyledFooter = styled.footer`
  color: var(--text-secondary);
  display: flex;
  padding: 1.5rem;
  width: 100%;
  justify-content: center; /* Center the footer text */

  a {
    text-decoration: none;
    color: inherit;
    margin: 0 0.5rem;
  }

  a:hover {
    color: var(--accent-purple);
    text-decoration: underline;
  }
`;
