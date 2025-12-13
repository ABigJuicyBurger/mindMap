import styled from "styled-components";
import { useState, useEffect } from "react";
import trashBin from "./assets/trashBin.png";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "./store";

export function TopicsList({ topicsList, setTopicsList, maxTopics }) {
  // can also destructure topics for easier readibility
  const [newTopic, setNewTopic] = useState("");
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  // on mount, if there's no selected cateogyr, set it to the first one
  useEffect(() => {
    if (!selectedCategory && topicsList?.length > 0) {
      setSelectedCategory(topicsList?.[0]);
    }
  }, [topicsList]);

  return (
    <>
      {topicsList.length > 0 ? (
        <StyledTopicsList>
          {topicsList.map((topic, index) => {
            return (
              <li key={index}>
                <button
                  className={selectedCategory === topic ? "clicked" : ""}
                  onClick={() => setSelectedCategory(topic)}
                >
                  {topic}
                </button>
                <button
                  onClick={() => console.log("remove topic", topic)}
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
