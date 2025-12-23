import styled from "styled-components";
import { useState } from "react";

export function NewTopicForm({
  topicsList,
  setTopicsList,
  setShowCategoriesPopup,
}) {
  const maxChar = 50;
  const [inputValues, setInputValues] = useState({
    topicName: "",
  });
  const [validationText, setValidationText] = useState("");
  const isTopicNameValid = inputValues.topicName.length < maxChar;

  const handleInputChange = (e) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.value.length >= maxChar) {
      setValidationText("Topic name is too long");
    } else {
      setValidationText("");
    }
  };

  function handleAddTopic(event) {
    event.preventDefault();
    if (inputValues.topicName.length === 0) {
      setValidationText("Topic name is required");
      setTimeout(() => setValidationText(null), 3000);
    } else {
      setTopicsList([...topicsList, inputValues.topicName]);
      setValidationText("");
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
      <h1>
        New Topic {maxChar - inputValues.topicName.length} / {maxChar}{" "}
        {isTopicNameValid ? "✅" : "❌"}:
      </h1>
      <StyledForm>
        <StyledLabel htmlFor="topicName">
          <input
            type="text" // what is being inputted
            id="topicName" // styling
            placeholder="Title (max 50 characters)" // placeholder
            name="topicName" // html attribute
            value={inputValues.topicName} // what is inputted
            onChange={handleInputChange}
          />
        </StyledLabel>
        <StyledButton onClick={(event) => handleAddTopic(event)}>
          Add Topic
        </StyledButton>
        {validationText ? (
          <p style={{ color: "red" }}>{validationText}</p>
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

const StyledForm = styled.form`
  border: 1px dotted papayawhip;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 15rem;
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
