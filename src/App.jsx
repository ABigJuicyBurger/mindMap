import { useState } from "react";
import { useAddLesson } from "./components/useAddLesson";
import { useRemoveLesson } from "./components/useRemoveLesson";
import "./App.css";
import { Header } from "./components/Header";
import { MainSection } from "./components/MainSection";
import { Footer } from "./components/Footer";
import { AsideSection } from "./components/AsideSection";

// make app small and tidy and easy to read and less scroll

function App() {
  console.log("App render");
  const [addNewLessonEntry, setAddNewLessonEntry] = useState(false);
  const { lessonEntries, handleNewLesson } = useAddLesson();
  const { handleRemoveLesson } = useRemoveLesson();
  const [inputValues, setInputValues] = useState({
    lessonTitle: "",
    lessonDescription: "",
  });

  return (
    <div className="app">
      <Header />
      <section className="mainContent">
        <AsideSection
          addNewLessonEntry={addNewLessonEntry}
          setAddNewLessonEntry={setAddNewLessonEntry}
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleNewLesson={handleNewLesson}
        />
        <MainSection
          lessonEntries={lessonEntries}
          handleRemoveLesson={handleRemoveLesson}
        />
      </section>
      <Footer />
    </div>
  );
}

export default App;
