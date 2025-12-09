import styled from "styled-components";
import squareLogo from "../assets/singleCardLogo.png";
import gridLogo from "../assets/gridLogo.png";

export function MainSectionHeader() {
  return (
    <Header>
      <h1 className="lessonsSectionTitle">Lessons so far...</h1>
      <img src={squareLogo} alt="singleCard" />
      <img src={gridLogo} alt="gridCard" />
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  h1 {
    flex: 1;
  }
  img {
    height: 36px;
    width: 36px;
    margin: 0 1rem;
  }
  img:hover {
    background-color: gray;
  }
  img:active {
    background-color: grey;
  }
`;
