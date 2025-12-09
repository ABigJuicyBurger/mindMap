import { useState } from "react";
import { useLessons } from "./useAddLesson";
import { AsideSection } from "./AsideSection";
import { MainSection } from "./MainSection";

export function MainContent() {
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
