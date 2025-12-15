import { AddLessonSection } from "../AddLessonSection";
import { NewLessonForm } from "../NewLessonForm";
import { CategoriesSection } from "../CategoriesSection";
import { useState } from "react";

export function AsideSection({ handleNewLesson }) {
  const [shouldShowPopup, setShowPopup] = useState(false);

  return (
    <aside>
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
      <CategoriesSection />
    </aside>
  );
}
