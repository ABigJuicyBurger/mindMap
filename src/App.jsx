import { useState } from "react";
import { useLessons } from "./components/useAddLesson";
import "./App.css";
import { Header } from "./components/Header";
import { MainSection } from "./components/MainSection";
import { Footer } from "./components/Footer";
import { AsideSection } from "./components/AsideSection";

// make app small and tidy and easy to read and less scroll

function App() {
  return (
    <div className="app">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;

function MainContent() {
  console.log("App render");
  // state that controls add-new-lesson popup visibility
  const [shouldShowPopup, setShowPopup] = useState(false);

  const { lessonEntries, handleNewLesson, handleRemoveLesson } = useLessons();

  const [inputValues, setInputValues] = useState({
    lessonTitle: "",
    lessonDescription: "",
  });

  return (
    <section className="mainContent">
      <AsideSection
        shouldShowPopup={shouldShowPopup}
        setShowPopup={setShowPopup}
        inputValues={inputValues}
        setInputValues={setInputValues}
        handleNewLesson={handleNewLesson}
      />
      <MainSection
        lessonEntries={lessonEntries}
        handleRemoveLesson={handleRemoveLesson}
      />
    </section>
  );
}
