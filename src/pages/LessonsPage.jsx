import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { selectedCategoryAtom } from "../store";
import { useLessons } from "../components/hooks/useAddLesson";
import { MainSection } from "../components/sections/MainSection/MainSection";
import { NewLessonForm } from "../components/sections/AsideSection/AddLessonSection/NewLessonForm/NewLessonForm";
import { RiArrowLeftLine, RiAddLine, RiCloseLine } from "react-icons/ri";

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
      <StyledHeader>
        {!shouldShowPopup ? (
           <IconButton onClick={() => navigate("/")} aria-label="Back">
             <RiArrowLeftLine size={24} />
           </IconButton>
        ) : (
           <div style={{ width: '2.75rem' }} /> /* Spacer for alignment */
        )}
        
        <PageTitle>
            {shouldShowPopup ? "New Lesson" : selectedCategory}
        </PageTitle>
        
        <IconButton 
            $primary={!shouldShowPopup}
            onClick={() => setShowPopup(!shouldShowPopup)}
            aria-label={shouldShowPopup ? "Close" : "Add Lesson"}
        >
          {shouldShowPopup ? <RiCloseLine size={24} /> : <RiAddLine size={24} />}
        </IconButton>
      </StyledHeader>

      <ContentArea>
          {shouldShowPopup ? (
            <FormContainer>
                <NewLessonForm
                  handleNewLesson={handleNewLesson}
                  setShowPopup={setShowPopup}
                />
            </FormContainer>
          ) : (
            <MainSection
                lessonEntries={lessonEntries}
                handleRemoveLesson={handleRemoveLesson}
            />
          )}
      </ContentArea>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
  padding: 1rem;
  padding-bottom: 8rem; /* Ensure space for bottom nav and scroll */
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 0.5rem 0;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  text-align: center;
  color: var(--text-primary);
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1rem;
`;

const IconButton = styled.button`
  background-color: ${props => props.$primary ? 'var(--button-bg)' : 'var(--card-bg)'};
  color: ${props => props.$primary ? 'var(--button-text)' : 'var(--text-primary)'};
  border: none;
  width: 2.75rem;
  height: 2.75rem;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0,0,0,0.15);
    background-color: ${props => props.$primary ? 'var(--accent-purple)' : 'white'};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ContentArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    animation: fadeIn 0.3s ease-out;
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

const FormContainer = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
`;
