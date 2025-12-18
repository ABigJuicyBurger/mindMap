import styled from "styled-components";

export function AddLessonSection({ setShowPopup, shouldShowPopup, children }) {
  function changeCardVisibility() {
    setShowPopup(!shouldShowPopup);
  }

  return (
    <section className="addLessonSection">
      <StyledButton
        onClick={() => {
          changeCardVisibility();
          // show me a div
        }}
      >
        {shouldShowPopup ? "Close" : "Add New Lesson"}
      </StyledButton>
      {children}
    </section>
  );
}

const StyledButton = styled.button`
  width: 9rem;
  margin: 1.5rem 1rem;
`;
