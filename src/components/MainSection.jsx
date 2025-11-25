// function Aside()
import styled from "styled-components";

export function MainSection({ lessonEntries }) {
  return (
    <StyledMain>
      <h1 className="lessonsSectionTitle">Lessons so far...</h1>

      <StyledSection>
        <br />
        {lessonEntries.map((lesson) => (
          <article className="lessonCard" key={lesson.id}>
            <header>
              <h2 className="lessonCardTitle">{lesson.title}</h2>
            </header>
            <p className="lessonCardDescription">{lesson.description}</p>
          </article>
        ))}
        <br />
      </StyledSection>
    </StyledMain>
  );
}

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  .lessonCard {
    border: 1px solid black;
    padding: 1rem;
    margin: 1rem;
    width: 10rem;
    height: 10rem;
  }
`;
