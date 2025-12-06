// import { topics } from "./App";
import { AddLessonSection } from "./AddLessonSection";
import { NewLessonForm } from "./NewLessonForm";
import { TopicsList } from "../TopicsList";

const topics = ["Coding", "Finance", "Life"];

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
      <section className="categoriesSection">
        <h2>Categories</h2>
        <TopicsList topics={topics} />
      </section>
    </aside>
  );
}
