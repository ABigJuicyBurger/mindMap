import styled from "styled-components";
import squareLogo from "../../../assets/singleCardLogo.png";
import gridLogo from "../../../assets/gridLogo.png";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "../../../store";

export function MainSectionHeader() {
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  return (
    <Header>
      <h1 className="lessonsSectionTitle">
        {selectedCategory || "All"} lessons so far...
      </h1>
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
