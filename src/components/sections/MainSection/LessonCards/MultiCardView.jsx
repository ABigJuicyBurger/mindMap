import styled from "styled-components";
import { RiDeleteBinLine, RiEditLine } from "react-icons/ri";

export function MultiCardView({
  visibleLessons,
  filteredLessons,
  setSingleCardView,
  setSingleCardIndex,
  setEditLesson,
  handleRemoveLesson,
}) {
  return (
    <>
      {visibleLessons.length === 0 && (
        <h3 style={{ textAlign: "center" }}>
          No lessons found. Click the + button to add a new lesson.
        </h3>
      )}
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
                    setSingleCardIndex(filteredLessons.indexOf(lesson));
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
    </>
  );
}

const EditButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: none;
  margin: 0;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  box-shadow: none;
  margin: 0;

  &:hover {
    background-color: rgba(230, 57, 70, 0.1);
    color: #e63946;
    transform: none;
    box-shadow: none;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  .lessonCardTitle {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.3;
    word-break: break-word;
    flex: 1;
    padding-right: 0.5rem;
  }
`;

const StyledSingleCardView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;

  .singlelessonCard {
    background-color: var(--card-bg);
    border: none;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    border-radius: 2rem;
    margin: 0.5rem 0;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 60vh;
    transition: transform 0.2s;

    .scroll-content {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      margin-top: 0.5rem;

      /* Clean Scrollbar */
      &::-webkit-scrollbar {
        width: 6px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
      }
    }

    p {
      margin: 0;
      line-height: 1.6;
      color: var(--text-secondary);
      font-size: 1rem;
      white-space: pre-wrap;
    }
  }
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-content: start;

  @media (min-width: 600px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(12.5rem, 1fr));
  }

  .lessonCard {
    background-color: var(--card-bg);
    border: none;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    border-radius: 1.5rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    height: 18rem;
    transition:
      transform 0.2s,
      box-shadow 0.2s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    .scroll-content {
      flex: 1;
      overflow-y: auto;
      min-height: 0;
      margin-top: 0.5rem;

      /* Clean Scrollbar */
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
      }
    }

    p {
      margin: 0;
      color: var(--text-secondary);
      font-size: 0.95rem;
      line-height: 1.5;
      white-space: pre-wrap;
    }
  }
`;
