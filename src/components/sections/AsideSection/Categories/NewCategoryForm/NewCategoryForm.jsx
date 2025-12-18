import { useState } from "react";

export function NewCategoryForm({ setShowCategoriesPopup }) {
  const [newTopic, setNewTopic] = useState("");

  return (
    <div>
      <h1>Add New Category</h1>
      <button onClick={() => setShowCategoriesPopup(false)}>Close</button>
    </div>
  );
}
