import styled from "styled-components";
import { useState } from "react";
import { useAtom } from "jotai";
import { maxCharAtom, lessonValidationTextAtom } from "../../../../../store";

export function NewLessonForm({ handleNewLesson, setShowPopup }) {
  const maxChar = useAtom(maxCharAtom)[0];
  const [lessonValidationText, setLessonValidationText] = useAtom(
    lessonValidationTextAtom,
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

  const handleSubmit = (e) => {
    // if (e.key === "Enter") {
    //   e.preventDefault();
    // }
    e.preventDefault();

    const success = handleNewLesson(inputValues);

    // check if success returns false
    if (success === false) {
      return;
    }
    if (success) {
      setShowPopup(false);
      setInputValues({
        lessonTitle: "",
        lessonDescription: "",
      });
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <HeaderRow>
        <FormTitle>New Lesson</FormTitle>
        <CharCount>
          {inputValues.lessonTitle.length} / {maxChar}
        </CharCount>
      </HeaderRow>

      <InputGroup>
        <StyledInput
          type="text"
          name="lessonTitle"
          value={inputValues.lessonTitle}
          onChange={handleInputChange}
          maxLength={maxChar}
          placeholder="Lesson Title"
          autoFocus
        />
        <InputUnderline />
      </InputGroup>

      <InputGroup>
        <StyledTextArea
          name="lessonDescription"
          value={inputValues.lessonDescription}
          onChange={handleInputChange}
          placeholder="What did you learn today?"
          rows={3}
        />
        <InputUnderline />
      </InputGroup>

      <ActionRow>
        <CancelButton type="button" onClick={() => setShowPopup(false)}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit">Add Lesson</SubmitButton>
      </ActionRow>

      {lessonValidationText && (
        <ValidationMessage>{lessonValidationText}</ValidationMessage>
      )}
    </StyledForm>
  );
}

const StyledForm = styled.form`
  background-color: var(--card-bg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  width: 100%;
  margin-bottom: 1rem;
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FormTitle = styled.h3`
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 600;
`;

const CharCount = styled.span`
  font-size: 0.8rem;
  color: var(--text-secondary);
  font-variant-numeric: tabular-nums;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  padding: 0.5rem 0;
  font-size: 1.1rem;
  color: var(--text-primary);
  outline: none;

  &::placeholder {
    color: #ccc;
  }

  &:focus + div {
    transform: scaleX(1);
    background-color: var(--accent-purple);
  }
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  background: none;
  border: none;
  padding: 0.5rem 0;
  font-size: 1rem;
  color: var(--text-primary);
  outline: none;
  resize: none;
  font-family: inherit;

  &::placeholder {
    color: #ccc;
  }

  &:focus + div {
    transform: scaleX(1);
    background-color: var(--accent-purple);
  }
`;

const InputUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #eee;
  transform: scaleX(0); /* Hidden by default or scaleX(1) if preferred */
  transform: scaleX(1);
  transform-origin: left;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const ButtonBase = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }
`;

const CancelButton = styled(ButtonBase)`
  background: transparent;
  color: var(--text-secondary);

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: var(--text-primary);
  }
`;

const SubmitButton = styled(ButtonBase)`
  background-color: var(--button-bg);
  color: var(--button-text);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: var(--accent-purple);
    box-shadow: 0 6px 15px rgba(94, 96, 206, 0.3);
  }
`;

const ValidationMessage = styled.p`
  color: #e63946;
  font-size: 0.85rem;
  margin-top: 1rem;
  text-align: center;
  background-color: rgba(230, 57, 70, 0.1);
  padding: 0.5rem;
  border-radius: 0.5rem;
`;
