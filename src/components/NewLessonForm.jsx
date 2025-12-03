import styled from "styled-components";

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
      <StyledLabel htmlFor="lessonTitle">
        <input
          type="text" // what is being inputted
          id="lessonTitle" // styling
          placeholder="Title" // placeholder
          name="lessonTitle" // html attribute
          value={inputValues.lessonTitle} // what is inputted
          onChange={handleInputChange}
        />
      </StyledLabel>
      <StyledLabel htmlFor="lessonDescription">
        <input
          type="text"
          id="lessonDescription"
          placeholder="What did you learn today?"
          name="lessonDescription"
          value={inputValues.lessonDescription}
          onChange={handleInputChange}
        />
      </StyledLabel>
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

const StyledLabel = styled.label`
  ::placeholder {
    color: papayawhip;
  }

  input {
    background: none;
    border: none;
    border-radius: 0.25rem;
    padding: 1rem 0.5rem;
  }

  input:focus {
    background-color: lightsteelblue;
  }
`;
