import { useState } from "react";
import { TopicsList } from "../TopicsList";

export function CategoriesSection() {
  const [topicsList, setTopicsList] = useState(["Coding", "Finance", "Life"]);
  return (
    <section className="categoriesSection">
      <h2>Categories</h2>
      <TopicsList topics={topicsList} />
    </section>
  );
}
