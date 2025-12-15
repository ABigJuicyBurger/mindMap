import { useLessons } from "./useAddLesson";
import { AsideSection } from "./layout/AsideSection";
import { MainSection } from "./MainSection";

export function MainContent() {
  console.log("App render");
  // state that controls add-new-lesson popup visibility

  const { lessonEntries, handleNewLesson, handleRemoveLesson } = useLessons();

  return (
    <section className="mainContent">
      <AsideSection handleNewLesson={handleNewLesson} />
      <MainSection
        lessonEntries={lessonEntries}
        handleRemoveLesson={handleRemoveLesson}
      />
    </section>
  );
}
