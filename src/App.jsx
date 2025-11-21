import { useState } from "react";
import { TopicsList } from "./TopicsList";
import { useAddLesson } from "./components/useAddLesson";
import { NewLessonForm } from "./components/NewLessonForm";

import "./App.css";
import { Header } from "./components/Header";
import { MainSection } from "./components/MainSection";
import { Footer } from "./components/Footer";

const topics = ["Coding", "Finance", "Life"];

// make app small and tidy and easy to read and less scroll

function App() {
  console.log("App render");

  const [inputValues, setInputValues] = useState({
    lessonTitle: "",
    lessonDescription: "",
  });
  const [addNewLessonEntry, setAddNewLessonEntry] = useState(false);
  const { lessonEntries, handleNewLesson } = useAddLesson();

  return (
    <div className="app">
      <Header />
      <section className="mainContent">
        <aside>
          <section className="addLessonSection">
            <button
              className="addNewLessonButton"
              onClick={() => {
                setAddNewLessonEntry(!addNewLessonEntry);
                // show me a div
              }}
            >
              Add New Lesson
            </button>
            {addNewLessonEntry && (
              <>
                <NewLessonForm
                  inputValues={inputValues}
                  setInputValues={setInputValues}
                  addNewLessonEntry={addNewLessonEntry}
                  setAddNewLessonEntry={setAddNewLessonEntry}
                  handleNewLesson={handleNewLesson}
                />
                {/* <button
                  className="addLessonButton"
                  onClick={() => {
                    console.log(inputValues);
                    handleNewLesson(inputValues);
                    setInputValues({
                      lessonTitle: "",
                      lessonDescription: "",
                    });
                    setAddNewLessonEntry(!addNewLessonEntry);
                  }}
                >
                  Add Lesson
                </button> */}
              </>
            )}
          </section>
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
