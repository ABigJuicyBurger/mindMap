import { useState } from "react";
import { TopicsList } from "../TopicsList";
import styled from "styled-components";

export function CategoriesSection() {
  const [topicsList, setTopicsList] = useState(["Coding", "Finance", "Life"]);
  return (
    <StyledSection>
      <section className="categoriesSection">
        <h2>Categories</h2>
        <TopicsList topics={topicsList} />
      </section>
    </StyledSection>
  );
}

const StyledSection = styled.section`
  h2 {
    color: papayawhip;
  }
  display: flex;
  flex-direction: column;
`;
