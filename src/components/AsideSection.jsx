// import { topics } from "./App";
import { AddLessonSection } from "./AddLessonSection";
import { NewLessonForm } from "./NewLessonForm";
import { TopicsList } from "../TopicsList";

const topics = ["Coding", "Finance", "Life"];

export function AsideSection({
  addNewLessonEntry,
  setAddNewLessonEntry,
  inputValues,
  setInputValues,
  handleNewLesson,
}) {
  return (
    <aside>
      <AddLessonSection
        setAddNewLessonEntry={setAddNewLessonEntry}
        addNewLessonEntry={addNewLessonEntry}
      >
        {addNewLessonEntry && (
          <>
            <NewLessonForm
              inputValues={inputValues}
              setInputValues={setInputValues}
              handleNewLesson={handleNewLesson}
              setAddNewLessonEntry={setAddNewLessonEntry}
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
