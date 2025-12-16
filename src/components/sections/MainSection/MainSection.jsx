// function Aside()
import styled from "styled-components";

import { useState } from "react";
import { MainSectionHeader } from "./MainSectionHeader";
import { selectedCategoryAtom } from "../../../store";
import { useAtom } from "jotai";

import { LessonCards } from "./LessonCards/LessonCards";

export function MainSection({ lessonEntries, handleRemoveLesson }) {
  const [currentPage, setCurrentPage] = useState(0);
  const CARDS_PER_PAGE = 6;

  const [selectedCategory] = useAtom(selectedCategoryAtom);

  const filteredLessons = lessonEntries.filter(
    (lesson) => lesson.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredLessons.length / CARDS_PER_PAGE);

  return (
    <StyledMain>
      <MainSectionHeader />
      <LessonCards
        filteredLessons={filteredLessons}
        currentPage={currentPage}
        CARDS_PER_PAGE={CARDS_PER_PAGE}
        handleRemoveLesson={handleRemoveLesson}
      />
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
