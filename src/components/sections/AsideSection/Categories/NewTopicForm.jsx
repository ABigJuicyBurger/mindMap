import styled from "styled-components";
import { useState } from "react";
import { maxCharAtom } from "../../../../store";
import { useAtom } from "jotai";

export function NewTopicForm({
  topicsList,
  setTopicsList,
  setShowCategoriesPopup,
}) {
  const maxChar = useAtom(maxCharAtom)[0];
  const [inputValues, setInputValues] = useState({
    topicName: "",
  });
  const [topicFormValidationText, setTopicFormValidationText] = useState("");
  const [changeTextAnimation, setChangeTextAnimation] = useState(false);

  const handleInputChange = (e) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleAddTopic(event) {
    event.preventDefault();
    validateInput();
  }

  function validateInput() {
    if (inputValues.topicName.length === 0) {
      setTopicFormValidationText("Topic name is required");
      setTimeout(() => setTopicFormValidationText(null), 3000);
    } else if (topicsList.includes(inputValues.topicName)) {
      setTopicFormValidationText("Topic name already exists");
      setTimeout(() => setTopicFormValidationText(null), 3000);
    } else {
      setTopicsList([...topicsList, inputValues.topicName]);
      setTopicFormValidationText("");
      handleResetInputs();
    }
  }

  function handleResetInputs() {
    setInputValues({
      topicName: "",
    });
    setShowCategoriesPopup(false);
  }

  return (
    <StyledSection>
      <StyledForm>
        <HeaderRow>
          <FormTitle>New Topic</FormTitle>
          <CharCount>
            {inputValues.topicName.length} / {maxChar}
          </CharCount>
        </HeaderRow>

        <InputGroup>
          <StyledInput
            type="text"
            id="topicName"
            placeholder="e.g. Biology"
            name="topicName"
            value={inputValues.topicName}
            onChange={handleInputChange}
            maxLength={maxChar}
            autoFocus
          />
          <InputUnderline />
        </InputGroup>

        <ActionRow>
          <CancelButton
            onClick={() => setShowCategoriesPopup(false)}
            type="button"
          >
            Cancel
          </CancelButton>
          <SubmitButton onClick={(event) => handleAddTopic(event)}>
            Add Topic
          </SubmitButton>
        </ActionRow>

        {topicFormValidationText ? (
          <ValidationMessage className={changeTextAnimation ? "shake" : ""}>
            {topicFormValidationText}
          </ValidationMessage>
        ) : null}
      </StyledForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledForm = styled.form`
  background-color: var(--card-bg);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  width: 100%;
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
  margin-bottom: 2rem;
`;

const StyledInput = styled.input`
  width: 100%;
  background: none;
  border: none;
  padding: 0.5rem 0;
  font-size: 1.2rem;
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

const InputUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #eee;
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

  &.shake {
    animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  @keyframes shake {
    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }
    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }
    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }
    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }
`;
