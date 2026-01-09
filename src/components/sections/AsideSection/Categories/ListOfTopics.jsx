import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { selectedCategoryAtom, topicListAtom } from "../../../../store";
import { useLessons } from "../../../hooks/useAddLesson";
import { useNavigate } from "react-router-dom";
import {
  RiArrowRightLine,
  RiDeleteBinLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

export function ListOfTopics() {
  const [topicsList, setTopicsList] = useAtom(topicListAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const { lessonEntries } = useLessons();
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  
  // Ref to track if scrolling is initiated by code (click) or user (swipe)
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  // Dialog State
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState(null);

  // Open Delete Dialog
  const confirmDelete = (topic) => {
    setTopicToDelete(topic);
    setDeleteDialogOpen(true);
  };

  // Perform Delete
  const handleDelete = () => {
    if (topicToDelete) {
      const nextState = topicsList.filter((topic) => topic !== topicToDelete);
      setTopicsList(nextState);

      // If we deleted the selected category, select the first one (or none)
      if (selectedCategory === topicToDelete) {
        setSelectedCategory(nextState.length > 0 ? nextState[0] : null);
      }
    }
    setDeleteDialogOpen(false);
    setTopicToDelete(null);
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setTopicToDelete(null);
  };

  // Ensure a category is selected on mount or update if possible
  useEffect(() => {
    if (
      (!selectedCategory || !topicsList.includes(selectedCategory)) &&
      topicsList?.length > 0
    ) {
      setSelectedCategory(topicsList[0]);
    }
  }, [topicsList, selectedCategory]);

  // Scroll to selected category when it changes
  useEffect(() => {
    if (selectedCategory && scrollContainerRef.current) {
      const index = topicsList.indexOf(selectedCategory);
      if (index !== -1) {
        const container = scrollContainerRef.current;
        const cardWrapper = container.children[0]; 
        if (!cardWrapper) return;
        
        const cardWidth = cardWrapper.offsetWidth;
        const gap = 16; 
        const containerWidth = container.offsetWidth;
        
        const scrollPos =
          index * (cardWidth + gap) - (containerWidth / 2) + (cardWidth / 2);

        // Mark as programmatic scroll to avoid onScroll updating state back
        isProgrammaticScroll.current = true;
        
        container.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });

        // Clear the programmatic flag after animation duration
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 600); // Typical smooth scroll duration
      }
    }
  }, [selectedCategory, topicsList]);

  // Handle scroll to update active dot
  const handleScroll = () => {
    // If we are scrolling programmatically, ignore updates to prevent fighting
    if (isProgrammaticScroll.current) return;
    
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    const cardWrapper = container.children[0];
    if (!cardWrapper) return;
    
    const cardWidth = cardWrapper.offsetWidth;
    const gap = 16;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.offsetWidth;

    const centerPos = scrollLeft + containerWidth / 2;
    const itemFullWidth = cardWidth + gap;
    
    const rawIndex = (centerPos - (cardWidth / 2)) / itemFullWidth;
    const index = Math.round(rawIndex);

    if (index >= 0 && index < topicsList.length) {
      // Only update if different
      if (topicsList[index] !== selectedCategory) {
        setSelectedCategory(topicsList[index]);
      }
    }
  };

  // Navigation handlers
  const handlePrev = () => {
    const currentIndex = topicsList.indexOf(selectedCategory);
    if (currentIndex > 0) {
      // This will trigger the useEffect to scroll
      setSelectedCategory(topicsList[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = topicsList.indexOf(selectedCategory);
    if (currentIndex < topicsList.length - 1) {
      setSelectedCategory(topicsList[currentIndex + 1]);
    }
  };

  const handleCardClick = (topic) => {
    if (topic === selectedCategory) {
      navigate(`/lessons/${topic}`);
    } else {
      setSelectedCategory(topic);
    }
  };

  if (topicsList.length === 0)
    return <EmptyState>No topics created yet. Add one above!</EmptyState>;

  return (
    <Container>
      <CarouselContainer 
        ref={scrollContainerRef} 
        onScroll={handleScroll}
      >
        {topicsList.map((topic) => {
          const lessonCount = lessonEntries.filter(
            (l) => l && l.category === topic
          ).length;
          const isActive = topic === selectedCategory;

          return (
            <CardWrapper key={topic}>
              <Card 
                onClick={() => handleCardClick(topic)}
                $isActive={isActive}
              >
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
                        confirmDelete(topic);
                      }}
                      title="Delete Category"
                    >
                      <RiDeleteBinLine />
                    </DeleteButton>
                  </CardTopRow>

                  <MainInfo>
                    <CategoryTitle>{topic}</CategoryTitle>
                    <ActionArea>
                      <ViewButton>
                        {isActive ? "See details" : "Tap to focus"} <RiArrowRightLine />
                      </ViewButton>
                    </ActionArea>
                  </MainInfo>

                  <StatsPill>
                    <span className="count">{lessonCount}</span>
                    <span className="label">Lessons</span>
                  </StatsPill>
                </CardContent>
              </Card>
            </CardWrapper>
          );
        })}
      </CarouselContainer>

      <ControlsRow>
        <NavButton onClick={handlePrev} disabled={topicsList.indexOf(selectedCategory) === 0}>
          <RiArrowLeftSLine size={24} />
        </NavButton>

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

        <NavButton onClick={handleNext} disabled={topicsList.indexOf(selectedCategory) === topicsList.length - 1}>
          <RiArrowRightSLine size={24} />
        </NavButton>
      </ControlsRow>

      {/* MUI Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            borderRadius: '1.5rem',
            padding: '1rem',
            backgroundColor: 'var(--card-bg)',
            minWidth: '300px'
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '1.8rem' }}>
          {"Delete Category?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ color: 'var(--text-secondary)' }}>
            Are you sure you want to delete <strong>{topicToDelete}</strong>?
            <br/><br/>
            This will permanently remove all lessons within this category. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>
            Cancel
          </Button>
          <Button onClick={handleDelete} autoFocus style={{ color: '#e63946', fontWeight: 'bold' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
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
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1rem;
  width: 100%;
  padding: 1rem 1rem 2rem 1rem;
  
  /* Hide scrollbar */
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const CardWrapper = styled.div`
  flex: 0 0 85%;
  scroll-snap-align: center;
  min-width: 0;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 14rem;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: ${(props) => props.$isActive ? "8px 8px 0px #000000" : "6px 6px 0px #000000"};
  border: 3px solid ${(props) => props.$isActive ? "var(--accent-purple)" : "#000000"};
  background-color: #ffffff;
  color: #000000;
  transition: all 0.3s ease;
  cursor: pointer;
  transform: ${(props) => props.$isActive ? "translate(-2px, -2px)" : "none"};

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 8px 8px 0px #000000;
    border-color: var(--accent-purple);
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
  z-index: 10;

  > * {
    fill: black;
  }

  &:hover {
    background: #000000;
    color: white;

    > * {
      fill: white;
    }
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
  margin-bottom: 0.5rem;
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
  position: absolute;
  bottom: 1.5rem;
  right: 1.5rem;
  
  background: #000000;
  border-radius: 0.75rem;
  padding: 0.4rem 0.8rem;
  display: flex;
  gap: 0.4rem;
  align-items: baseline;
  color: white;
  box-shadow: none;
  border: none;
  
  .label {
    font-size: 0.7rem;
    font-weight: 600;
    color: #cccccc;
    text-transform: uppercase;
  }

  .count {
    font-size: 1.1rem;
    font-family: serif;
    font-style: italic;
    font-weight: 700;
    color: #ffffff;
  }
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: black;
  border-radius: 2rem;
`;

const NavButton = styled.button`
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  box-shadow: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s;
  padding: 0;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
    transform: none;
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.button`
  border-radius: 50%;
  border: none;
  padding: 0;
  width: 10px;
  height: 10px;
  
  margin: 0;
  cursor: pointer;
  background-color: ${(props) =>
    props.$active ? "var(--accent-purple)" : "#666666"};
  transition: all 0.3s ease;
  transform: ${(props) => (props.$active ? "scale(1.2)" : "scale(1)")};
  box-shadow: none;

  &:hover {
    background-color: var(--accent-purple);
    opacity: 1;
  }
`;