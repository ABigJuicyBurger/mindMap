import { useLessons } from "../hooks/useAddLesson";
import { AsideSection } from "../sections/AsideSection/AsideSection";
import { MainSection } from "../sections/MainSection/MainSection";

export function MainContent() {
  console.log("App render");
  // state that controls add-new-lesson popup visibility

  const {
    lessonEntries,
    handleNewLesson,
    handleRemoveLesson,
    handleRemoveCategory,
  } = useLessons();

  return (
    <section className="mainContent">
      <AsideSection
        handleNewLesson={handleNewLesson}
        handleRemoveCategory={handleRemoveCategory}
      />
      <MainSection
        lessonEntries={lessonEntries}
        handleRemoveLesson={handleRemoveLesson}
      />
    </section>
  );
}
