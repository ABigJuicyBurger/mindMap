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
    if (
      (!selectedCategory || !topicsList.includes(selectedCategory)) &&
      topicsList?.length > 0
    ) {
      setSelectedCategory(topicsList[0]);
    }
  }, [topicsList, selectedCategory]);

  if (topicsList.length === 0)
    return <EmptyState>No topics created yet. Add one above!</EmptyState>;
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
              onClick={(e) => {
                e.stopPropagation();
                removeTopic(selectedCategory);
              }}
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
  height: 14rem;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 6px 6px 0px #000000;
  border: 3px solid #000000;
  background-color: #ffffff;
  color: #000000;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px #000000;
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0px #000000;
  }
`;

const CardBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  z-index: 0;
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  justify-content: space-between;
  color: #000000;
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
  opacity: 0.7;
  font-weight: 700;
  color: #000000;
`;

const DeleteButton = styled.button`
  margin: 0;
  background: transparent;
  border: 2px solid #000000;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;

  &:hover {
    background: #000000;
    color: white;
  }

  &:hover img {
    filter: invert(1);
  }

  img {
    width: 18px;
    height: 18px;
  }
`;

const MainInfo = styled.div`
  margin-top: auto;
  margin-bottom: 1.5rem;
  color: #000000;
`;

const CategoryTitle = styled.h2`
  font-size: 2.5rem;
  margin: 0 0 0.5rem 0;
  font-family: serif;
  font-style: italic;
  font-weight: 800;
  line-height: 1.1;
  color: #000000;
  text-shadow: none;
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
  font-weight: 600;
  color: #000000;

  svg {
    transition: transform 0.2s;
  }

  ${Card}:hover & svg {
    transform: translateX(4px);
  }
`;

const StatsPill = styled.div`
  background: #000000;
  border-radius: 1rem;
  padding: 0.75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  box-shadow: none;
  border: 2px solid #000000;

  .label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #cccccc;
  }

  .count {
    font-size: 1.5rem;
    font-family: serif;
    font-style: italic;
    font-weight: 700;
    color: #ffffff;
  }
`;

const DotsContainer = styled.div`
  background-color: black;
  border-radius: 1rem;
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
  background-color: ${(props) =>
    props.$active ? "var(--accent-purple)" : "#D1D1D6"};
  transition: all 0.3s ease;
  transform: ${(props) => (props.$active ? "scale(1.25)" : "scale(1)")};

  &:hover {
    background-color: var(--accent-purple);
    opacity: 0.7;
  }
`;
