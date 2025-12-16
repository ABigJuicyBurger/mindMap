import { AddLessonSection } from "./AddLessonSection/AddLessonSection";
import { NewLessonForm } from "./AddLessonSection/NewLessonForm/NewLessonForm";
import { CategoriesSection } from "./Categories/CategoriesSection";
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
