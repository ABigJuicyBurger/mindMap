export function MultiCardView({
  visibleLessons,
  filteredLessons,
  setSingleCardView,
  setSingleCardIndex,
  setEditLesson,
  handleRemoveLesson,
}) {
  return (
    <StyledSection>
      {visibleLessons.map((lesson) => (
        <article
          className="lessonCard"
          key={lesson.id}
          onClick={() => {
            setSingleCardView(true);
            setSingleCardIndex(filteredLessons.indexOf(lesson));
          }}
        >
          <CardHeader>
            <h2 className="lessonCardTitle">{lesson.title}</h2>
            <EditButton>
              <RiEditLine
                size={18}
                onClick={(e) => {
                  e.stopPropagation();
                  setEditLesson(true);
                }}
              />
            </EditButton>
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveLesson(lesson.id);
              }}
              aria-label="Delete Lesson"
            >
              <RiDeleteBinLine size={18} />
            </DeleteButton>
          </CardHeader>
          <div className="scroll-content">
            <p className="lessonCardDescription">{lesson.description}</p>
          </div>
        </article>
      ))}
      <br />
    </StyledSection>
  );
}
