import styled from "styled-components";
import { useState } from "react";

export function NewTopicForm({
  topicsList,
  setTopicsList,
  setShowCategoriesPopup,
  maxTopics,
}) {
  const [isFormValid, setIsFormValid] = useState(true);
  const maxChar = 50;
  const [inputValues, setInputValues] = useState({
    topicName: "",
  });
  const handleInputChange = (e) => {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    isFormValid
      ? setIsFormValid(e.target.value.length <= maxChar)
      : alert("Max character limit reached!") &&
        e.preventDefault() &&
        setIsFormValid(false);
  };

  const addTopic = (topicName) => {
    if (topicsList.length < maxTopics) {
      setTopicsList([...topicsList, topicName]);
    } else {
      alert("Max topics reached");
    }
  };

  return (
    <StyledSection>
      <h1>
        New Topic {maxChar - inputValues.topicName.length} / {maxChar}{" "}
        {isFormValid ? "✅" : "❌"}:
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
      <StyledButton
        onClick={() => {
          addTopic(inputValues.topicName);
          setInputValues({
            topicName: "",
          });
          setShowCategoriesPopup(false);
        }}
      >
        Add Topic
      </StyledButton>
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
