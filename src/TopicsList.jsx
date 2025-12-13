import styled from "styled-components";
import { useState } from "react";
import trashBin from "./assets/trashBin.png";

export function TopicsList({ topicsList, setTopicsList, maxTopics }) {
  // can also destructure topics for easier readibility
  const [newTopic, setNewTopic] = useState("");
  const [buttonClicked, setButtonClicked] = useState(0);
  return (
    <>
      {topicsList.length > 0 ? (
        <StyledTopicsList>
          {topicsList.map((topic, index) => {
            return (
              <li key={index}>
                <button
                  className={buttonClicked === index ? "clicked" : ""}
                  onClick={() => setButtonClicked(index)}
                >
                  {topic}
                </button>
                <button
                  onClick={() => console.log("remove topic", index)}
                  className="deleteButton"
                >
                  <img src={trashBin} alt="delete" />
                </button>
              </li>
            );
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
  width: 15rem;

  li {
    display: flex;
    width: 100%;
    button {
      width: 7.5rem;
      cursor: pointer;

      &.clicked {
        background-color: papayawhip;
        color: #333;
        font-weight: bold;
        border: 1px solid lightsteelblue;
      }
    }
  }

  button.deleteButton {
    width: fit-content;
    background: none;
    border: none;
    box-shadow: none;
    cursor: pointer;
    margin: 0.5rem;

    img {
      width: 24px;
      mix-blend-mode: darken;
    }

    img:hover {
      transform: scale(1.1);
      filter: brightness(0.8);
    }
  }
`;
