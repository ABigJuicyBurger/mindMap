import styled from "styled-components";

export function AddLessonSection({ setShowPopup, shouldShowPopup, children }) {
  function changeCardVisibility() {
    setShowPopup(!shouldShowPopup);
  }

  return (
    <section className="addLessonSection">
      <StyledButton
        className="addNewLessonButton"
        onClick={() => {
          changeCardVisibility();
          // show me a div
        }}
      >
        Add New Lesson
      </StyledButton>
      {children}
    </section>
  );
}

const StyledButton = styled.button `
  margin: 1.5rem
`    ;