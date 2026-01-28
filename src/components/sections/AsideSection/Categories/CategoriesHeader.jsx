import styled from "styled-components";
import { useState } from "react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";

export function CategoriesHeader({
  topicsList,
  setShowCategoriesPopup,
  shouldShowCategoriesPopup,
}) {
  const [tempMessage, setTempMessage] = useState(null);

  const maxTopics = 5;
  const isSpaceAvailable = topicsList.length <= maxTopics - 1;

  function toggleForm() {
    console.log(shouldShowCategoriesPopup);
    if (shouldShowCategoriesPopup) {
      setShowCategoriesPopup(!shouldShowCategoriesPopup);
      return;
    }

    if (isSpaceAvailable) {
      setShowCategoriesPopup(true);
    } else {
      setTempMessage(
        "Maximum categories reached - please remove some categories first",
      );
      setTimeout(() => setTempMessage(null), 3000);
    }
  }

  return (
    <>
      <StyledHeader>
        <TitleGroup>
          <h2>Categories</h2>
          <CountBadge>
            {topicsList.length}/{maxTopics}
          </CountBadge>
        </TitleGroup>

        <IconButton
          onClick={toggleForm}
          aria-label={shouldShowCategoriesPopup ? "Close" : "Add Category"}
        >
          {shouldShowCategoriesPopup ? (
            <RiCloseLine size={24} />
          ) : (
            <RiAddLine size={24} />
          )}
        </IconButton>
      </StyledHeader>

      {tempMessage && <ValidationMessage>{tempMessage}</ValidationMessage>}
    </>
  );
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  padding: 0.1rem;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
  }
`;

const CountBadge = styled.span`
  background-color: var(--card-bg);
  color: var(--text-secondary);
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 1rem;
  font-weight: 500;
`;

const IconButton = styled.button`
  background-color: var(--button-bg);
  color: var(--button-text);
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s ease,
    background-color 0.2s;
  margin: 0;

  &:hover {
    transform: scale(1.05);
    background-color: var(--accent-purple);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ValidationMessage = styled.div`
  color: #e63946;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  background-color: rgba(230, 57, 70, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-align: center;
`;
