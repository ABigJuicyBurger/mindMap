import styled from "styled-components";
import { useState } from "react";
import { useAtom } from "jotai";
import { maxCharAtom, lessonValidationTextAtom } from "../../../../../store";

export function NewLessonForm({ handleNewLesson, setShowPopup }) {
  const maxChar = useAtom(maxCharAtom)[0];
  const [lessonValidationText, setLessonValidationText] = useAtom(
    lessonValidationTextAtom
  );

  const [inputValues, setInputValues] = useState({
    lessonTitle: "",
    lessonDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
            type="text"
            id="lessonTitle"
            placeholder="Title"
            name="lessonTitle"
            value={inputValues.lessonTitle}
            onChange={handleInputChange}
            maxLength={maxChar}
          />
          <div>
            <span>{maxChar - inputValues.lessonTitle.length}</span>/{maxChar}
          </div>
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
          onClick={(e) => {
            e.preventDefault();
            const success = handleNewLesson(inputValues);
            if (success) {
              setShowPopup(false);
            }
            setInputValues({
              lessonTitle: "",
              lessonDescription: "",
            });
          }}
        >
          Add Lesson
          {lessonValidationText ? (
            <p style={{ color: "red" }}>{lessonValidationText}</p>
          ) : null}
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
  border-radius: 2rem;
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
