import styled from "styled-components";
import { useState } from "react";


export function TopicsList({topicsList, setTopicsList, maxTopics}) {
  // can also destructure topics for easier readibility
  const [newTopic, setNewTopic] = useState("");
  const [buttonClicked, setButtonClicked] = useState("");

  return (
    
    <>
      {topicsList.length > 0 ? (
        <StyledTopicsList>
          {topicsList.map((topic, index) => {
            return <li key={index}>
              <button className={buttonClicked === index ? "clicked" : ""} onClick={() => setButtonClicked(index)}>{topic}</button>
              </li>;
          })}
        </StyledTopicsList>
      ) : (
        <div>No topics</div>
      )}
    </>

  );
}

const StyledTopicsList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  padding: 0;

  li {
    button {
    min-width: 5rem;
      cursor: pointer;
      
      &.clicked {
        background-color: papayawhip;
        color: #333;
        font-weight: bold;
        border: 2px solid lightsteelblue;
      }
    
    }

    
  }

     
`;
