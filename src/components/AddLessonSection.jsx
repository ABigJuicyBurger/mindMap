export function AddLessonSection({ setShowPopup, shouldShowPopup, children }) {
  function changeCardVisibility() {
    setShowPopup(!shouldShowPopup);
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
