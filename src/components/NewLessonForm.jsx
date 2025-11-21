export function NewLessonForm({ inputValues, setInputValues }) {
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
          type="text"
          id="lessonTitle"
          placeholder="Title"
          name="lessonTitle"
          value={inputValues.lessonTitle}
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
    </section>
  );
}
