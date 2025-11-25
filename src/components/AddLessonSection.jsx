export function AddLessonSection({ setAddNewLessonEntry, children }) {
  function changeCardVisibility() {
    setAddNewLessonEntry(true);
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
