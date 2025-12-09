import { AddLessonSection } from "./AddLessonSection";
import { NewLessonForm } from "./NewLessonForm";
import { CategoriesSection } from "./CategoriesSection";

export function AsideSection({
  shouldShowPopup,
  setShowPopup,
  inputValues,
  setInputValues,
  handleNewLesson,
}) {
  return (
    <aside>
      <AddLessonSection
        setShowPopup={setShowPopup}
        shouldShowPopup={shouldShowPopup}
      >
        {shouldShowPopup && (
          <>
            <NewLessonForm
              inputValues={inputValues}
              setInputValues={setInputValues}
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
