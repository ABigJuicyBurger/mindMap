// function Aside()
import styled from "styled-components";

import { useState } from "react";
import { selectedCategoryAtom } from "../../../store";
import { useAtom } from "jotai";

import { MainSectionHeader } from "./MainSectionHeader";
import { LessonCards } from "./LessonCards/LessonCards";
import { CarouselSection } from "./CarouselSection/CarouselSection";
import { SingleCardButtons } from "./SingleCardButtons";

export function MainSection({
  lessonEntries,
  handleRemoveLesson,
  singleCardView,
  setSingleCardView,
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const CARDS_PER_PAGE = 6;

  const [selectedCategory] = useAtom(selectedCategoryAtom);
  const filteredLessons = lessonEntries.filter(
    (lesson) => lesson && lesson.category === selectedCategory
  );
  const totalLessons = filteredLessons.length;

  const totalPages = Math.ceil(filteredLessons.length / CARDS_PER_PAGE);

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
        setSingleCardIndex={setSingleCardIndex}
        setSingleCardView={setSingleCardView}
      />
      {singleCardView ? (
        <SingleCardButtons
          setSingleCardIndex={setSingleCardIndex}
          singleCardIndex={singleCardIndex}
          totalLessons={totalLessons}
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
