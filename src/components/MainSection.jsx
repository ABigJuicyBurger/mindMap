// function Aside()
import styled from "styled-components";
import trashBin from "../assets/trashBin.png";

import { useState } from "react";
import { MainSectionHeader } from "./MainSectionHeader";

export function MainSection({ lessonEntries, handleRemoveLesson }) {
  const [currentPage, setCurrentPage] = useState(0);
  const CARDS_PER_PAGE = 6;
  const totalPages = Math.ceil(lessonEntries.length / CARDS_PER_PAGE);

  const start = currentPage * CARDS_PER_PAGE;
  const end = start + CARDS_PER_PAGE;
  const visibleLessons = lessonEntries.slice(start, end);

  const maxPages = 2;

  return (
    <StyledMain>
      <MainSectionHeader />
      {/* if section has more than 6 entries make a new section up to 3 max (18 cards max) */}
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
        {/* <StyledDiv> */}
        {/* <div className="carousel__item"></div> */}

        {/* </StyledDiv> */}
      </StyledSection>
      <StyledDiv>
        {Array.from({ length: totalPages }).map((_, index) => (
          <span
            key={index}
            className={
              index === currentPage
                ? "carousel__button carousel__button--selected"
                : "carousel__button"
            }
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </StyledDiv>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  /* grid-template-rows: repeat(6, minmax(25%, auto)); */
  gap: 1rem;

  @media (min-width: 600px) {
    /* small tablets: 2 columns */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    /* laptops/desktops: 3 columns */
    grid-template-columns: repeat(3, minmax(12.5rem, 1fr));
    grid-template-rows: repeat(2, minmax(50%, auto));
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

const StyledDiv = styled.div`
  width: 100%;
  padding: 1.25rem 0;
  /* background-colsor: red; */
  text-align: center;

  .carousel__button {
    width: 0.625rem;
    height: 0.625rem;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    margin: 0 0.625rem;
    cursor: pointer;
  }

  .carousel__button--selected {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
