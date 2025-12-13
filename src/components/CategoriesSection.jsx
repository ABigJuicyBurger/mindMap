import { TopicsList } from "../TopicsList";
import { useState } from "react";

import styled from "styled-components";

const INITIAL_TOPICS = [
  "Coding",
  "Finance",
  "Life",
  "Mental Health",
  "Physical Health",
];
export function CategoriesSection() {
  const maxTopics = 5;
  const [topicsList, setTopicsList] = useState(INITIAL_TOPICS);

  return (
    <StyledSection>
      <section className="categoriesSection">
        <h2>
          Categories {topicsList.length}/{maxTopics}
        </h2>
        <TopicsList
          topicsList={topicsList}
          setTopicsList={setTopicsList}
          maxTopics={maxTopics}
        />
      </section>
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
