export function AddLessonSection({
  addNewLessonEntry,
  setAddNewLessonEntry,
  children,
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
