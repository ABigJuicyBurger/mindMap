import { useState } from "react";
import { TopicsList } from "./TopicsList";
import { useAddLesson } from "./components/useAddLesson";
import { NewLessonForm } from "./components/NewLessonForm";

import "./App.css";
import { Header } from "./components/Header";
import { MainSection } from "./components/MainSection";
import { Footer } from "./components/Footer";
import { AddLessonSection } from "./components/AddLessonSection";

const topics = ["Coding", "Finance", "Life"];

// make app small and tidy and easy to read and less scroll

function App() {
  console.log("App render");
  const [addNewLessonEntry, setAddNewLessonEntry] = useState(false);
  const { lessonEntries, handleNewLesson } = useAddLesson();

  const [inputValues, setInputValues] = useState({
    lessonTitle: "",
    lessonDescription: "",
  });

  return (
    <div className="app">
      <Header />
      <section className="mainContent">
        <aside>
          <AddLessonSection
            addNewLessonEntry={addNewLessonEntry}
            setAddNewLessonEntry={setAddNewLessonEntry}
          >
            {addNewLessonEntry && (
              <>
                <NewLessonForm
                  inputValues={inputValues}
                  setInputValues={setInputValues}
                  handleNewLesson={handleNewLesson}
                  setAddNewLessonEntry={setAddNewLessonEntry}
                  addNewLessonEntry={addNewLessonEntry}
                />
              </>
            )}
          </AddLessonSection>
          <section className="categoriesSection">
            <h2>Categories</h2>
            <TopicsList topics={topics} />
          </section>
        </aside>
        <MainSection lessonEntries={lessonEntries} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
