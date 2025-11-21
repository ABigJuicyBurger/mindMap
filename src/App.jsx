import { useState } from "react";
import { TopicsList } from "./TopicsList";
import { useAddLesson } from "./components/useAddLesson";
import { NewLessonForm } from "./components/NewLessonForm";

import "./App.css";
import { Header } from "./components/Header";

const topics = ["Coding", "Finance", "Life"];

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
                />
                <button
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
                </button>
              </>
            )}
          </section>
          <section className="categoriesSection">
            <h2>Categories</h2>
            <TopicsList topics={topics} />
          </section>
        </aside>
        <main>
          <section className="lessonsSection">
            <h2>Lessons so far...</h2>
            <br />
            {lessonEntries.map((lesson) => (
              <article key={lesson.id}>
                <header>
                  <h3>{lesson.title}</h3>
                </header>
                <p>{lesson.lesson}</p>
              </article>
            ))}
            <br />
          </section>
        </main>
      </section>
      <footer className="footer">
        Made by <a href="https://github.com/ABigJuicyBurger">Bader Muhssin</a>
      </footer>
    </div>
  );
}

export default App;
