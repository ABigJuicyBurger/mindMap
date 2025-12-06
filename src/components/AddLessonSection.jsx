export function AddLessonSection({
  setAddNewLessonEntry,
  children,
  addNewLessonEntry,
}) {
  function changeCardVisibility() {
    setAddNewLessonEntry(!addNewLessonEntry);
  }

  return (
    <section className="addLessonSection">
      <button
        className="addNewLessonButton"
        onClick={() => {
          changeCardVisibility();
          // show me a div
        }}
      >
        Add New Lesson
      </button>
      {children}
    </section>
  );
}
