import { AddLessonSection } from "./AddLessonSection/AddLessonSection";
import { NewLessonForm } from "./AddLessonSection/NewLessonForm/NewLessonForm";
import { CategoriesSection } from "./Categories/CategoriesSection";
import { useState } from "react";
import styled from "styled-components";

export function AsideSection({ handleNewLesson, handleRemoveCategory }) {
  const [shouldShowPopup, setShowPopup] = useState(false);
  const [shouldShowCategoriesPopup, setShowCategoriesPopup] = useState(false);

  return (
    <StyledAside>
      <AddLessonSection
        setShowPopup={setShowPopup}
        shouldShowPopup={shouldShowPopup}
      >
        {shouldShowPopup && (
          <>
            <NewLessonForm
              handleNewLesson={handleNewLesson}
              setShowPopup={setShowPopup}
            />
          </>
        )}
      </AddLessonSection>
      <CategoriesSection
        setShowCategoriesPopup={setShowCategoriesPopup}
        shouldShowCategoriesPopup={shouldShowCategoriesPopup}
        handleRemoveCategory={handleRemoveCategory}
      />
    </StyledAside>
  );
}

const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;
