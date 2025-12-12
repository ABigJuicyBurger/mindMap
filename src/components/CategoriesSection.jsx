import { useState } from "react";
import { TopicsList } from "../TopicsList";
import styled from "styled-components";

export function CategoriesSection() {
  const [topicsList, setTopicsList] = useState(["Coding", "Finance", "Life", "Mental Health", "Physical Health" ]);
  return (
    <StyledSection>
      <section className="categoriesSection">
        <h2>Categories (For now hardcoded 0/5 each one max char limit)</h2>
        <TopicsList topics={topicsList} />
      </section>
    </StyledSection>
  );
}

const StyledSection = styled.section`
border: 1px dotted papayawhip;

  display: flex;
  flex-direction: column;

   h2 {
    color: papayawhip;
  }
`;
