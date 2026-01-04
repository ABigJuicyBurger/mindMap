import styled from "styled-components";
import squareLogo from "../../../assets/singleCardLogo.png";
import gridLogo from "../../../assets/gridLogo.png";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "../../../store";

export function MainSectionHeader({ setSingleCardView, singleCardView }) {
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  return (
    <Header>
      <h1 className="lessonsSectionTitle">
        {selectedCategory || "All"} lessons so far...
      </h1>
      <img
        src={squareLogo}
        alt="singleCard"
        onClick={() => {
          setSingleCardView(true);
        }}
        className={singleCardView === true ? "active" : ""}
      />
      <img
        src={gridLogo}
        alt="gridCard"
        onClick={() => setSingleCardView(false)}
        className={singleCardView === false ? "active" : ""}
      />
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  
  h1 {
    flex: 1;
    font-size: 1.5rem;
    color: var(--text-primary);
  }
  img {
    height: 36px;
    width: 36px;
    padding: 6px;
    margin: 0 0.25rem;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  img:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  img.active {
    background-color: rgba(94, 96, 206, 0.2); /* Low opacity accent purple */
    border: 1px solid var(--accent-purple);
  }
`;
