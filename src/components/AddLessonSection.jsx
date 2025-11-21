import { useState } from "react";

export function AddLessonSection() {
  const [addNewLessonEntry, setAddNewLessonEntry] = useState(false);

  return (
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
    </section>
  );
}
