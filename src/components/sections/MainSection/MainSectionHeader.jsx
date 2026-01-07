import styled from "styled-components";
import { RiLayoutGridFill, RiRectangleLine } from "react-icons/ri";

export function MainSectionHeader({ setSingleCardView, singleCardView }) {
  return (
    <Header>
      <ViewToggle>
        <ToggleButton
          $active={!singleCardView}
          onClick={() => setSingleCardView(false)}
          aria-label="Grid View"
        >
          <RiLayoutGridFill size={20} />
        </ToggleButton>
        <ToggleButton
          $active={singleCardView}
          onClick={() => setSingleCardView(true)}
          aria-label="Single Card View"
        >
          <RiRectangleLine size={20} />
        </ToggleButton>
      </ViewToggle>
    </Header>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: flex-end; /* Align toggles to right */
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
`;

const ViewToggle = styled.div`
  display: flex;
  background-color: var(--card-bg);
  padding: 0.25rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const ToggleButton = styled.button`
  background-color: ${(props) =>
    props.$active ? "var(--button-bg)" : "transparent"};
  color: ${(props) => (props.$active ? "white" : "var(--text-secondary)")};
  border: none;
  padding: 0.5rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: none;
  margin: 0;
  transition: all 0.2s ease;

  &:hover {
    color: ${(props) => (props.$active ? "white" : "var(--text-primary)")};
    background-color: ${(props) =>
      props.$active ? "var(--button-bg)" : "rgba(0,0,0,0.05)"};
  }
`;
