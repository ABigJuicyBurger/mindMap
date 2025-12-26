import { useLessons } from "../hooks/useAddLesson";
import { AsideSection } from "../sections/AsideSection/AsideSection";
import { MainSection } from "../sections/MainSection/MainSection";

export function MainContent() {
  console.log("App render");
  // state that controls add-new-lesson popup visibility

  const { lessonEntries, handleRemoveLesson } = useLessons();

  return (
    <section className="mainContent">
      <AsideSection />
      <MainSection
        lessonEntries={lessonEntries}
        handleRemoveLesson={handleRemoveLesson}
      />
    </section>
  );
}
