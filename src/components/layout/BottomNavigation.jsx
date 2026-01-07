import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedCategoryAtom, topicListAtom } from "../../store";
import { RiLayoutGridFill, RiBrainLine } from "react-icons/ri";
import { TbCardsFilled } from "react-icons/tb";

export function BottomNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const [topicList] = useAtom(topicListAtom);

  const isHome = location.pathname === "/";
  // Check if we are on a lessons page.
  const isLessons = location.pathname.includes("/lessons");
  const isBrain = location.pathname === "/brain";

  const handleCardsClick = () => {
    if (selectedCategory) {
      navigate(`/lessons/${selectedCategory}`);
    } else if (topicList.length > 0) {
      // Fallback to first topic if none selected
      navigate(`/lessons/${topicList[0]}`);
    }
  };

  return (
    <NavWrapper>
      <NavContainer>
        <NavButton $active={isHome} onClick={() => navigate("/")}>
          <RiLayoutGridFill size={24} />
          <span>Category</span>
        </NavButton>
        <NavButton $active={isBrain} onClick={() => navigate("/brain")}>
          <RiBrainLine size={24} />
          <span>Brain</span>
        </NavButton>
        <NavButton $active={isLessons} onClick={handleCardsClick}>
          <TbCardsFilled size={24} />
          <span>Cards</span>
        </NavButton>
      </NavContainer>
    </NavWrapper>
  );
}

const NavWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  pointer-events: none; /* Allow clicks to pass through to sides if container doesn't fill width */
  z-index: 1000;
  padding-bottom: 1rem; /* Space from bottom edge */
`;

const NavContainer = styled.nav`
  background-color: var(--button-bg); /* Dark Navy */
  width: 90%;
  max-width: 400px;
  border-radius: 2.5rem; /* More rounded */
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25); /* Deeper shadow */
  pointer-events: auto;
`;

const NavButton = styled.button`
  flex: 1;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  cursor: pointer;
  color: ${(props) => (props.$active ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)")};
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  span {
    font-size: 0.75rem;
    font-weight: ${(props) => (props.$active ? "600" : "500")};
    letter-spacing: 0.5px;
  }

  /* Active Indicator Dot */
  &::after {
    content: "";
    position: absolute;
    top: -8px;
    width: 4px;
    height: 4px;
    background-color: var(--accent-purple);
    border-radius: 50%;
    opacity: ${(props) => (props.$active ? 1 : 0)};
    transform: ${(props) =>
      props.$active ? "translateY(0)" : "translateY(5px)"};
    transition: all 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    color: #ffffff;
  }

  &:active {
    transform: scale(0.95);
  }
`;
