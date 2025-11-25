// function Aside()
import styled from "styled-components";

export function MainSection({ lessonEntries }) {
  return (
    <StyledMain>
      <Header>
        <h1 className="lessonsSectionTitle">Lessons so far...</h1>
        <img src="singleCardLogo.png" alt="singleCard" />
        <img src="gridLogo" alt="gridCard" />
      </Header>
      <StyledSection>
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

const Header = styled.header`
  display: flex;
  align-items: center;
  h1 {
    flex: 1;
  }
  img {
    margin: 0 1rem;
  }
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  // so what happens if i have more than six cards...? and how can that be resolve?

  .lessonCard {
    border: 1px solid black;
    padding: 1rem;
    margin: 1rem 0;
    width: 90%;
    height: 90%;
  }
`;
