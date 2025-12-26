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
  const isTopicNameValid = inputValues.topicName.length <= maxChar;

  const handleInputChange = (e) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.value.length > maxChar) {
      setTopicFormValidationText("Topic name is too long");
    } else {
      setTopicFormValidationText("");
    }
  };

  function handleAddTopic(event) {
    event.preventDefault();
    validateInput();
  }

  function validateInput() {
    if (inputValues.topicName.length === 0) {
      setTopicFormValidationText("Topic name is required");
      setTimeout(() => setTopicFormValidationText(null), 3000);
    } else if (inputValues.topicName.length > maxChar) {
      // make validation text shake
      setChangeTextAnimation(true);
      setTimeout(() => setChangeTextAnimation(false), 3000);
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
      <StyledHeader>
        New Topic {maxChar - inputValues.topicName.length} / {maxChar}{" "}
        {isTopicNameValid ? "✅" : "❌"}:
      </StyledHeader>
      <StyledForm>
        <StyledLabel htmlFor="topicName">
          <input
            type="text" // what is being inputted
            id="topicName" // styling
            placeholder={`Title (max ${maxChar} characters)`} // placeholder
            name="topicName" // html attribute
            value={inputValues.topicName} // what is inputted
            onChange={handleInputChange}
          />
        </StyledLabel>
        <StyledButton onClick={(event) => handleAddTopic(event)}>
          Add Topic
        </StyledButton>
        {topicFormValidationText ? (
          <p
            className={changeTextAnimation === true ? "validationText" : "none"}
            style={{ color: "red" }}
          >
            {topicFormValidationText}
          </p>
        ) : null}
      </StyledForm>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  width: 15rem;
  color: papayawhip;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledHeader = styled.h1`
  color: papayawhip;
  font-size: 1.5rem;
`;

const StyledForm = styled.form`
  border: 1px dotted papayawhip;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 15rem;

  .validationText {
    // make text shake to alert user

    @keyframes shake {
      from,
      to {
        transform: translate(0, 0);
      }
      20% {
        transform: translate(2px, 0);
      }
      40% {
        transform: translate(0, 2px);
      }
      60% {
        transform: translate(-2px, 0);
      }
      80% {
        transform: translate(0, -2px);
      }
    }

    animation: shake 0.5s infinite alternate;
  }
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
