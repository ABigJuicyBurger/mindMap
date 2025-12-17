export function NewCategoryForm({ setShowCategoriesPopup }) {
  return (
    <div>
      <h1>Add New Category</h1>
      <button onClick={() => setShowCategoriesPopup(false)}>Close</button>
    </div>
  );
}
