import styled from "styled-components";

export function CarouselSection({ totalPages, currentPage, setCurrentPage }) {
  return (
    <DotsContainer>
      {Array.from({ length: totalPages }).map((_, index) => (
        <Dot
          key={index}
          $active={index === currentPage}
          onClick={() => setCurrentPage(index)}
          aria-label={`Select page ${index + 1}`}
        />
      ))}
    </DotsContainer>
  );
}

const DotsContainer = styled.div`
  width: 6.625rem;
  align-self: center;
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
