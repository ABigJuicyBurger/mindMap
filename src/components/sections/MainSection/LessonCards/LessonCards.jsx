import styled from "styled-components";
import trashBin from "../../../../assets/trashBin.png";

export function LessonCards({
  filteredLessons,
  handleRemoveLesson,
  currentPage,
  CARDS_PER_PAGE,
  singleCardView,
}) {
  const start = currentPage * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;

  const visibleLessons = filteredLessons.slice(start, end);

  console.log({ singleCardView });
  return (
    <StyledSection>
      {visibleLessons.map((lesson) => (
        <article className="lessonCard" key={lesson.id}>
          <button
            onClick={() => handleRemoveLesson(lesson.id)}
            className="deleteButton"
          >
            <img src={trashBin} alt="delete" />
          </button>
          <div className="lessonContent">
            <header>
              <h2 className="lessonCardTitle">{lesson.title}</h2>
            </header>
            <p className="lessonCardDescription">{lesson.description}</p>
          </div>
        </article>
      ))}
      <br />
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  gap: 1rem;

  @media (min-width: 600px) {
    /* small tablets: 2 columns */
    grid-template-columns: repeat(2, minmax(0, 1fr));

    grid-template-rows: repeat(3, 1fr);
  }

  @media (min-width: 1024px) {
    /* laptops/desktops: 3 columns */
    grid-template-columns: repeat(3, minmax(12.5rem, 1fr));
    grid-template-rows: repeat(2, 1fr);
  }

  .lessonCard {
    border: 1px dotted papayawhip;
    border-radius: 2rem;
    margin: 0.5rem 0;
    padding: 0 0.25rem;

    display: flex;
    flex-direction: row;
    align-items: baseline;

    overflow-y: hidden;
    max-height: 50vh;
    min-height: 0;
    height: 20vh;

    @media (min-width: 600px) {
      height: auto;
    }

    button {
      margin: 0.5rem;
      img {
        width: 24px;
        mix-blend-mode: darken;
      }
    }

    .lessonContent {
      display: flex;
      flex-direction: column;
      flex: 1;
      min-height: 0;
    }

    header {
      display: flex;
      max-height: 2.5rem;
      overflow-y: hidden;
      padding: 0 0.75rem;
    }

    p {
      flex-grow: 1;
      min-height: 0;
      overflow-y: scroll;
      word-wrap: break-word;
      max-height: 100vh;

      padding: 0 1rem 0 0.75rem;

      @media (min-width: 1024px) {
        /* Chrome / Edge / Safari */
        &::-webkit-scrollbar {
          width: 0.5rem;
          // push scrollbar away from box
        }

        &::-webkit-scrollbar-track {
          background: #9b9cc9;
        }

        &::-webkit-scrollbar-thumb {
          background-color: lightsteelblue;
          border-radius: 1rem;
        }
      }
    }
  }
`;
