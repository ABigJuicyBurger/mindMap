import styled from "styled-components";
import trashBin from "../../../../assets/trashBin.png";
import { useState } from "react";

export function LessonCards({
  filteredLessons,
  handleRemoveLesson,
  currentPage,
  CARDS_PER_PAGE,
  singleCardView,
  singleCardIndex,
}) {
  const start = currentPage * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;

  const visibleLessons = filteredLessons.slice(start, end);

  console.log(singleCardIndex);

  return (
    <>
      {singleCardView ? (
        <StyledSingleCardView>
          <article
            className="singlelessonCard"
            key={filteredLessons[singleCardIndex].id}
          >
            <button
              onClick={() =>
                handleRemoveLesson(filteredLessons[singleCardIndex].id)
              }
              className="deleteButton"
            >
              <img src={trashBin} alt="delete" />
            </button>
            <div className="lessonContent">
              <header>
                <h2 className="lessonCardTitle">
                  {filteredLessons[singleCardIndex].title}
                </h2>
              </header>
              <p className="lessonCardDescription">
                {filteredLessons[singleCardIndex].description}
              </p>
            </div>
          </article>
        </StyledSingleCardView>
      ) : (
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
      )}
    </>
  );
}

const StyledSingleCardView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1;

  .singlelessonCard {
    border: 1px dotted papayawhip;
    border-radius: 2rem;
    margin: 0.5rem 0;
    padding: 0 0.25rem;

    display: flex;
    flex-direction: row;
    align-items: baseline;

    overflow-y: auto;
    max-height: 50vh;
    min-height: 0;

    height: 50vh;
    flex: 1;

    @media (min-width: 600px) {
      height: 70vh;
      max-height: 70vh;
    }

    @media (min-width: 1024px) {
      height: 60vh;
      max-height: 60vh;
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
      min-height: 25vh;
      height: 100%;
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
      overflow-x: hidden;
      word-wrap: break-word;
      word-break: break-word;
      max-height: calc(50vh - 3rem);

      @media (min-width: 600px) {
        min-height: 50vh;
        max-height: calc(70vh - 3rem);
      }

      @media (min-width: 1024px) {
        max-height: calc(60vh - 3rem);
      }

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

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  align-content: start;

  @media (min-width: 600px) {
    /* small tablets: 2 columns */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    /* laptops/desktops: 3 columns */
    grid-template-columns: repeat(3, minmax(12.5rem, 1fr));
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
      height: 30vh;
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
      height: 100%;
    }

    header {
      display: flex;
      max-height: 2.5rem;
      overflow-y: hidden;
      padding: 0 0.75rem;
    }

    p {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      word-break: break-word;

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
