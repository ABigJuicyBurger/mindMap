import styled from "styled-components";
import { useState } from "react";

export function NewTopicForm({
  topicsList,
  setTopicsList,
  setShowCategoriesPopup,
  maxTopics,
}) {
  const maxChar = 50;
  const [inputValues, setInputValues] = useState({
    topicName: "",
  });
  const [validationText, setValidationText] = useState("");
  console.log("🚀 ~ NewTopicForm ~ validationText:", validationText);

  const isTopicNameValid = inputValues.topicName.length <= maxChar;

  const handleInputChange = (e) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleAddTopic() {
    const isSpaceAvailable = topicsList.length <= maxTopics;
    if (isSpaceAvailable) {
      console.log("🚀 ~ addTopic ~ topicsList:", topicsList);
      setTopicsList([...topicsList, inputValues.topicName]);
      setValidationText("");
    } else {
      console.log("🚀 ~ addTopic ~ topicName:", inputValues.topicName);
      setValidationText("Max topics reached");
    }

    // TODO: UX bug -- the validation text is showing up AFTER the topic input form appears

    handleResetInputs();
  }

  function handleResetInputs() {
    // reset inputs
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
      <StyledButton onClick={handleAddTopic}>Add Topic</StyledButton>
      {validationText ? <p style={{ color: "red" }}>{validationText}</p> : null}
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
