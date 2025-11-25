export function NewLessonForm({
  inputValues,
  setInputValues,
  handleNewLesson,
  setAddNewLessonEntry,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", value);
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <section className="newLessonSection">
      <h2>New Lesson:</h2>
      <label htmlFor="lessonTitle">
        <input
          type="text" // what is being inputted
          id="lessonTitle" // styling
          placeholder="Title" // placeholder
          name="lessonTitle" // html attribute
          value={inputValues.lessonTitle} // what is inputted
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="lessonDescription">
        <input
          type="text"
          id="lessonDescription"
          placeholder="What did you learn today?"
          name="lessonDescription"
          value={inputValues.lessonDescription}
          onChange={handleInputChange}
        />
      </label>
      <button
        className="addLessonButton"
        onClick={() => {
          console.log(inputValues);
          handleNewLesson(inputValues);
          setInputValues({
            lessonTitle: "",
            lessonDescription: "",
          });
          setAddNewLessonEntry(false);
        }}
      >
        Add Lesson
      </button>
    </section>
  );
}
