import { NewTopicForm } from "./NewTopicForm";

import { useState } from "react";

import styled from "styled-components";
import { CategoriesHeader } from "./CategoriesHeader";
import { TopicsList } from "./TopicsList";

const INITIAL_TOPICS = [
  "Coding",
  "Finance",
  "Life",
  "Mental Health",
  "Physical Health",
];
export function CategoriesSection({}) {
  const maxTopics = 5;
  const [topicsList, setTopicsList] = useState(INITIAL_TOPICS);
  const [shouldShowCategoriesPopup, setShowCategoriesPopup] = useState(false);
  const isSpaceAvailable = topicsList.length <= maxTopics - 1;

  // when categories

  return (
    <StyledSection>
      <CategoriesContainer>
        <CategoriesHeader
          topicsList={topicsList}
          maxTopics={maxTopics}
          setShowCategoriesPopup={setShowCategoriesPopup}
          shouldShowCategoriesPopup={shouldShowCategoriesPopup}
          isSpaceAvailable={isSpaceAvailable}
        />
        {shouldShowCategoriesPopup ? (
          <NewTopicForm
            topicsList={topicsList}
            setTopicsList={setTopicsList}
            setShowCategoriesPopup={setShowCategoriesPopup}
            isSpaceAvailable={isSpaceAvailable}
          />
        ) : (
          <TopicsList
            topicsList={topicsList}
            maxTopics={maxTopics}
            setTopicsList={setTopicsList}
          />
        )}
      </CategoriesContainer>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: papayawhip;
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 1rem;
`;
