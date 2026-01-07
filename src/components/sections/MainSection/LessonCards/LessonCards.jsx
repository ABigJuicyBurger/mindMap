import { useState } from "react";
import { MultiCardView } from "./MultiCardView";
import { EditLessonForm } from "./EditLessonForm";
import { SingleCardView } from "./SingleCardView";

export function LessonCards({
  filteredLessons,
  handleRemoveLesson,
  currentPage,
  CARDS_PER_PAGE,
  singleCardView,
  setSingleCardView,
  setSingleCardIndex,
  singleCardIndex,
}) {
  const start = currentPage * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;

  const visibleLessons = filteredLessons.slice(start, end);
  const [editLesson, setEditLesson] = useState(false);

  if (editLesson) {
    return (
      <EditLessonForm
        lesson={filteredLessons[singleCardIndex]}
        setEditLesson={setEditLesson}
      />
    );
  }

  if (singleCardView) {
    return (
      <SingleCardView
        filteredLessons={filteredLessons}
        singleCardIndex={singleCardIndex}
        handleRemoveLesson={handleRemoveLesson}
        setEditLesson={setEditLesson}
      />
    );
  }

  return (
    <MultiCardView
      visibleLessons={visibleLessons}
      filteredLessons={filteredLessons}
      setSingleCardView={setSingleCardView}
      setSingleCardIndex={setSingleCardIndex}
      setEditLesson={setEditLesson}
      handleRemoveLesson={handleRemoveLesson}
    />
  );
}
