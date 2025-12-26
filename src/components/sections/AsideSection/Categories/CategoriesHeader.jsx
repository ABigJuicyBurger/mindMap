import styled from "styled-components";
import { useState } from "react";

export function CategoriesHeader({
  topicsList,
  setShowCategoriesPopup,
  shouldShowCategoriesPopup,
}) {
  const [tempMessage, setTempMessage] = useState(null);

  const maxTopics = 5;
  const isSpaceAvailable = topicsList.length <= maxTopics - 1;

  function changeCardVisibility() {
    if (isSpaceAvailable) {
      setShowCategoriesPopup(!shouldShowCategoriesPopup);
    } else {
      // return a temporary div
      setTempMessage(
        "Maximum categories reached - please remove some categories first"
      );
      setTimeout(() => setTempMessage(null), 3000);
    }
  }
  return (
    <>
      <StyledHeader>
        <h2>
          Categories {topicsList.length}/{maxTopics}
        </h2>
      </StyledHeader>
      <StyledButton
        onClick={() => {
          changeCardVisibility();
          // show me a div
        }}
      >
        {shouldShowCategoriesPopup ? "Close" : "Add New Category"}
      </StyledButton>
      {tempMessage && (
        <div
          style={{ color: "red", margin: "0 0 0.5rem 0", fontSize: "0.9rem" }}
        >
          {tempMessage}
        </div>
      )}
    </>
  );
}

const StyledButton = styled.button`
  width: 9rem;
  margin: 1.5rem 0;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
