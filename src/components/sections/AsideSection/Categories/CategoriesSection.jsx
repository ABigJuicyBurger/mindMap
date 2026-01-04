import { NewTopicForm } from "./NewTopicForm";
import { useState } from "react";

import { CategoriesHeader } from "./CategoriesHeader";
import { ListOfTopics } from "./ListOfTopics";
import { useAtom } from "jotai";
import { topicListAtom } from "../../../../store";

import styled from "styled-components";

export function CategoriesSection({}) {
  const [topicsList, setTopicsList] = useAtom(topicListAtom);
  const [shouldShowCategoriesPopup, setShowCategoriesPopup] = useState(false);

  // when categories

  return (
    <StyledSection>
      <CategoriesContainer>
        <CategoriesHeader
          topicsList={topicsList}
          setShowCategoriesPopup={setShowCategoriesPopup}
          shouldShowCategoriesPopup={shouldShowCategoriesPopup}
        />
        {shouldShowCategoriesPopup ? (
          <NewTopicForm
            topicsList={topicsList}
            setTopicsList={setTopicsList}
            setShowCategoriesPopup={setShowCategoriesPopup}
          />
        ) : (
          <ListOfTopics />
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
    color: var(--text-primary);
  }
`;

const CategoriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  width: 100%;
  overflow-x: hidden; /* Ensure the container itself doesn't scroll, but lets children scroll if they handle it */
`;
