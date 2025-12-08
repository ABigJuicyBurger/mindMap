// function Aside()
import styled from "styled-components";
import trashBin from "../assets/trashBin.png";
import squareLogo from "../assets/singleCardLogo.png";
import gridLogo from "../assets/gridLogo.png";

export function MainSection({ lessonEntries, handleRemoveLesson }) {
  const buttons = document.querySelectorAll(".carousel__button");
  console.log(buttons);
  buttons.forEach((button, i) => {
    button.addEventListener("click", () => {
      // items.forEach((item) =>
      //   item.classList.remove("carousel__item--selected")
      // );
      buttons.forEach((button) =>
        button.classList.remove("carousel__button--selected")
      );
      // items[i].classList.add("carousel__item--selected");
      buttons[i].classList.add("carousel__button--selected");
    });
  });

  return (
    <StyledMain>
      <Header>
        <h1 className="lessonsSectionTitle">Lessons so far...</h1>
        <img src={squareLogo} alt="singleCard" />
        <img src={gridLogo} alt="gridCard" />
      </Header>
      <StyledSection>
        {lessonEntries.map((lesson) => (
          <article className="lessonCard" key={lesson.id}>
            <button
              onClick={() => handleRemoveLesson(lesson.id)}
              className="deleteButton"
            >
              <img src={trashBin} alt="delete" />
            </button>
            <div className="lessonContent">
              <header>
                <h2 className="lessonCardTitle">{lesson.title}</h2>
              </header>
              <p className="lessonCardDescription">{lesson.description}</p>
            </div>
          </article>
        ))}
        <br />
        {/* <StyledDiv> */}
        {/* <div className="carousel__item"></div> */}

        {/* </StyledDiv> */}
      </StyledSection>
      <StyledDiv>
        <span className="carousel__button "></span>
        <span className="carousel__button"></span>
        <span className="carousel__button"></span>
      </StyledDiv>
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
    height: 36px;
    width: 36px;
    margin: 0 1rem;
  }
  img:hover {
    background-color: gray;
  }
  img:active {
    background-color: grey;
  }
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, minmax(26vh, auto));
  gap: 1rem;
  // so what happens if i have more than six cards...? and how can that be resolve?

  @media (min-width: 600px) {
    /* small tablets: 2 columns */
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    /* laptops/desktops: 3 columns */
    grid-template-columns: repeat(3, minmax(12.5rem, 1fr));
  }

  .lessonCard {
    border: 1px dotted papayawhip;
    border-radius: 2rem;
    /* padding: 1rem 0; */
    margin: 0.5rem 0;
    display: flex;
    flex-direction: row;
    align-items: baseline;

    button {
      margin: 0.5rem;
      img {
        width: 24px;
        mix-blend-mode: darken;
      }
    }

    .lessonContent {
      display: flex;
      flex-direction: column;
    }

    header {
      display: flex;
      max-height: 2.5rem;
      overflow-y: auto;
    }

    p {
      /* width: fit-content; */
      word-wrap: break-word;
      flex-grow: 1;
      max-height: calc(100% - 2.5rem);
      overflow-y: auto;
    }
  }
`;

const StyledDiv = styled.div`
  width: 100%;
  padding: 1.25rem 0;
  /* background-colsor: red; */
  text-align: center;

  .carousel__button {
    width: 0.625rem;
    height: 0.625rem;
    display: inline-block;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    margin: 0 0.625rem;
    cursor: pointer;
  }

  .carousel__button--selected {
    background-color: rgba(255, 255, 255, 0.5);
  }
`;
