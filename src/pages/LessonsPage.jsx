import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "../store";
import { useLessons } from "../components/hooks/useAddLesson";
import { MainSection } from "../components/sections/MainSection/MainSection";
import { AddLessonSection } from "../components/sections/AsideSection/AddLessonSection/AddLessonSection";
import { NewLessonForm } from "../components/sections/AsideSection/AddLessonSection/NewLessonForm/NewLessonForm";

export function LessonsPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const { lessonEntries, handleRemoveLesson, handleNewLesson } = useLessons();
  const [shouldShowPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category, setSelectedCategory]);

  return (
    <PageContainer>
      <HeaderActions>
        <BackButton onClick={() => navigate("/")}>
          ← Back to Categories
        </BackButton>
        <AddLessonWrapper>
          <AddLessonSection
            setShowPopup={setShowPopup}
            shouldShowPopup={shouldShowPopup}
          >
            {shouldShowPopup && (
              <NewLessonForm
                handleNewLesson={handleNewLesson}
                setShowPopup={setShowPopup}
              />
            )}
          </AddLessonSection>
        </AddLessonWrapper>
      </HeaderActions>

      <MainSection
        lessonEntries={lessonEntries}
        handleRemoveLesson={handleRemoveLesson}
      />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding: 1rem;
`;

const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: transparent;
  color: var(--text-primary);
  box-shadow: none;
  padding: 0;
  margin: 0;
  font-size: 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    transform: none;
    box-shadow: none;
    background: transparent;
  }
`;

const AddLessonWrapper = styled.div`
  /* Override styles if necessary to make AddLessonSection fit nicely */
  .addLessonSection {
    height: auto;
    margin: 0;
  }
`;
