// function Aside()
import styled from "styled-components";

import { useState } from "react";
import { selectedCategoryAtom } from "../../../store";
import { useAtom } from "jotai";

import { MainSectionHeader } from "./MainSectionHeader";
import { LessonCards } from "./LessonCards/LessonCards";
import { CarouselSection } from "./CarouselSection/CarouselSection";
import { SingleCardButtons } from "./SingleCardButtons";

export function MainSection({ lessonEntries, handleRemoveLesson }) {
  const [currentPage, setCurrentPage] = useState(0);
  const CARDS_PER_PAGE = 6;

  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const filteredLessons = lessonEntries.filter(
    (lesson) => lesson.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredLessons.length / CARDS_PER_PAGE);
  const [singleCardView, setSingleCardView] = useState(false);

  const [singleCardIndex, setSingleCardIndex] = useState(0);

  return (
    <StyledMain>
      <MainSectionHeader
        setSingleCardView={setSingleCardView}
        singleCardView={singleCardView}
      />
      <LessonCards
        singleCardView={singleCardView}
        filteredLessons={filteredLessons}
        currentPage={currentPage}
        CARDS_PER_PAGE={CARDS_PER_PAGE}
        handleRemoveLesson={handleRemoveLesson}
        singleCardIndex={singleCardIndex}
      />
      {singleCardView ? (
        <SingleCardButtons
          setSingleCardIndex={setSingleCardIndex}
          singleCardIndex={singleCardIndex}
        />
      ) : (
        <CarouselSection
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
`;
