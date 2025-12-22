import styled from "styled-components";
import { useState } from "react";

export function NewLessonForm({ handleNewLesson, setShowPopup }) {
  const [inputValues, setInputValues] = useState({
    lessonTitle: "",
    lessonDescription: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("Input changed:", value);
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <StyledSection>
      <h2>New Lesson:</h2>
      <StyledForm>
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
        <StyledButton
          onClick={() => {
            console.log(inputValues);
            handleNewLesson(inputValues);
            setInputValues({
              lessonTitle: "",
              lessonDescription: "",
            });
            setShowPopup(false);
          }}
        >
          Add Lesson
        </StyledButton>
      </StyledForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  flex-grow: unset;

  width: 15rem;
  color: papayawhip;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
`;

const StyledForm = styled.form`
  border: 1px dotted papayawhip;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const StyledLabel = styled.label`
  width: 100%;
  ::placeholder {
    color: black;
  }

  input {
    width: 100%;
    background: none;
    border: none;
    border-radius: 0.25rem;
    padding: 1rem 0.1rem;
  }

  input:focus {
    background-color: lightsteelblue;
  }
`;

const StyledButton = styled.button`
  width: 9rem;
  margin: 1rem 0;
`;
