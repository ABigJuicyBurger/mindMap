import styled from "styled-components";
import { useEffect } from "react";
import trashBin from "../../../../assets/trashBin.png";
import { useAtom } from "jotai";
import { selectedCategoryAtom, topicListAtom } from "../../../../store";
import { useLessons } from "../../../hooks/useAddLesson";
import { useNavigate } from "react-router-dom";
import { RiArrowRightLine } from "react-icons/ri";

export function ListOfTopics() {
  const [topicsList, setTopicsList] = useAtom(topicListAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const { lessonEntries } = useLessons();
  const navigate = useNavigate();

  function removeTopic(topicToRemove) {
    const nextState = topicsList.filter((topic) => topic !== topicToRemove);
    setTopicsList(nextState);
    
    // If we deleted the selected category, select the first one (or none)
    if (selectedCategory === topicToRemove) {
        setSelectedCategory(nextState.length > 0 ? nextState[0] : null);
    }
  }

  // Ensure a category is selected on mount or update if possible
  useEffect(() => {
    if ((!selectedCategory || !topicsList.includes(selectedCategory)) && topicsList?.length > 0) {
      setSelectedCategory(topicsList[0]);
    }
  }, [topicsList, selectedCategory]);

  if (topicsList.length === 0) return <EmptyState>No topics created yet. Add one above!</EmptyState>;
  if (!selectedCategory) return null; // Wait for effect to select one

  // Calculate lesson count for current category
  const currentLessonCount = lessonEntries.filter(
    (l) => l.category === selectedCategory
  ).length;

  return (
    <Container>
      <Card onClick={() => navigate(`/lessons/${selectedCategory}`)}>
        <CardBackground>
           <div className="gradient-overlay"></div>
           <div className="shape shape-1"></div>
           <div className="shape shape-2"></div>
        </CardBackground>
        
        <CardContent>
            <CardTopRow>
                <CategoryLabel>Category</CategoryLabel>
                <DeleteButton 
                    onClick={(e) => { e.stopPropagation(); removeTopic(selectedCategory); }}
                    title="Delete Category"
                >
                    <img src={trashBin} alt="Delete" />
                </DeleteButton>
            </CardTopRow>
            
            <MainInfo>
              <CategoryTitle>{selectedCategory}</CategoryTitle>
              <ActionArea>
                 <ViewButton>
                    See details <RiArrowRightLine />
                 </ViewButton>
              </ActionArea>
            </MainInfo>
            
            <StatsPill>
                <span className="label">Lessons</span>
                <span className="count">{currentLessonCount}</span>
            </StatsPill>
        </CardContent>
      </Card>

      <DotsContainer>
        {topicsList.map((topic) => (
          <Dot
            key={topic}
            $active={topic === selectedCategory}
            onClick={() => setSelectedCategory(topic)}
            aria-label={`Select ${topic}`}
          />
        ))}
      </DotsContainer>
    </Container>
  );
}

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
  background: var(--card-bg);
  border-radius: 1rem;
  width: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 14rem; /* Slightly taller for better spacing */
  border-radius: 2rem;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(94, 96, 206, 0.25);
  background-color: var(--accent-purple);
  color: white;
  margin-bottom: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  
  &:hover {
      transform: translateY(-4px);
      box-shadow: 0 15px 35px rgba(94, 96, 206, 0.35);
  }
`;

const CardBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #480ca8 0%, #5E60CE 100%);
  z-index: 0;
  
  .gradient-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3));
  }
  
  .shape {
      position: absolute;
      border-radius: 50%;
      filter: blur(50px);
      opacity: 0.5;
  }
  
  .shape-1 {
      width: 180px;
      height: 180px;
      background: #4EA8DE;
      top: -40px;
      right: -40px;
  }
  
  .shape-2 {
      width: 120px;
      height: 120px;
      background: #64DFDF;
      bottom: 20px;
      left: -30px;
      opacity: 0.3;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  justify-content: space-between;
`;

const CardTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CategoryLabel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.8;
  font-weight: 600;
`;

const DeleteButton = styled.button`
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: background 0.2s;
  backdrop-filter: blur(4px);
  
  &:hover {
      background: rgba(255,255,255,0.3);
  }
  
  img {
      width: 18px;
      height: 18px;
      filter: invert(1);
  }
`;

const MainInfo = styled.div`
  margin-top: auto;
  margin-bottom: 1.5rem;
`;

const CategoryTitle = styled.h2`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-family: serif;
  font-style: italic;
  font-weight: 700;
  line-height: 1.1;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ActionArea = styled.div`
    display: flex;
    align-items: center;
`;

const ViewButton = styled.span`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.9;
    
    svg {
        transition: transform 0.2s;
    }
    
    ${Card}:hover & svg {
        transform: translateX(4px);
    }
`;

const StatsPill = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-primary);
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  backdrop-filter: blur(10px);
  
  .label {
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-secondary);
  }
  
  .count {
      font-size: 1.5rem;
      font-family: serif;
      font-style: italic;
      font-weight: 700;
      color: var(--text-primary);
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  padding: 0.75rem;
`;

const Dot = styled.button`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  background-color: ${props => props.$active ? 'var(--accent-purple)' : '#D1D1D6'};
  transition: all 0.3s ease;
  transform: ${props => props.$active ? 'scale(1.25)' : 'scale(1)'};
  
  &:hover {
      background-color: var(--accent-purple);
      opacity: 0.7;
  }
`;
