import styled from "styled-components";
import { useState } from "react";


export function TopicsList({topicsList, setTopicsList}) {
  // can also destructure topics for easier readibility
  const [newTopic, setNewTopic] = useState("");

  return (
    // return state variables too
    <>
      {topicsList.length > 0 ? (
        <StyledTopicsList>
          {topicsList.map((topic, index) => {
            return <li key={index}><button>{topic}</button></li>;
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
    }

  }
`;
