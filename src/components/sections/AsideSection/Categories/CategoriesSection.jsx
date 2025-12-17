import { TopicsList } from "./TopicsList/TopicsList";
import { useState } from "react";
import { NewCategoryForm } from "./NewCategoryForm/NewCategoryForm";
import styled from "styled-components";

const INITIAL_TOPICS = [
  "Coding",
  "Finance",
  "Life",
  "Mental Health",
  "Physical Health",
];
export function CategoriesSection({
  shouldShowCategoriesPopup,
  setShowCategoriesPopup,
}) {
  function changeCardVisibility() {
    setShowCategoriesPopup(!shouldShowCategoriesPopup);
  }
  const maxTopics = 5;
  const [topicsList, setTopicsList] = useState(INITIAL_TOPICS);

  function removeTopic(topicToRemove) {
    const nextState = topicsList.filter((topic) => topic !== topicToRemove);
    setTopicsList(nextState);
  }

  return (
    <StyledSection>
      <CategoriesContainer>
        <CategoriesHeader>
          <h2>
            Categories {topicsList.length}/{maxTopics}
          </h2>
        </CategoriesHeader>
        <StyledButton
          onClick={() => {
            changeCardVisibility();
            // show me a div
          }}
        >
          Add New Category
        </StyledButton>
        {shouldShowCategoriesPopup ? (
          <NewCategoryForm setShowCategoriesPopup={setShowCategoriesPopup} />
        ) : (
          <TopicsList
            topicsList={topicsList}
            setTopicsList={setTopicsList}
            maxTopics={maxTopics}
            removeTopic={removeTopic}
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

const StyledButton = styled.button`
  margin: 1.5rem 0;
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 1rem;
`;

const CategoriesHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
