import styled from "styled-components";

export function CategoriesHeader({
  topicsList,
  maxTopics,
  setShowCategoriesPopup,
  shouldShowCategoriesPopup,
}) {
  function changeCardVisibility() {
    setShowCategoriesPopup(!shouldShowCategoriesPopup);
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
        Add New Category
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  margin: 1.5rem 0;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
