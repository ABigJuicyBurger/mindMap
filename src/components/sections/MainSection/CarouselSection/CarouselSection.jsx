import styled from "styled-components";

export function CarouselSection({ totalPages, currentPage, setCurrentPage }) {
  return (
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
  );
}

const StyledDiv = styled.div`
  width: 100%;
  padding: 1.25rem 0;
  /* background-colsor: red; */
  text-align: center;

  .carousel__button {
    width: 0.625rem;
    height: 0.625rem;
    display: inline-block;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    margin: 0 0.625rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .carousel__button--selected {
    background-color: var(--accent-purple);
    transform: scale(1.2);
  }
`;
