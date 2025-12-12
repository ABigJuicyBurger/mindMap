import styled from "styled-components";

export function TopicsList(props) {
  // can also destructure topics for easier readibility
  return (
    <>
      {!props.topics ? (
        <div>Loading</div>
      ) : props.topics.length > 0 ? (
        <StyledTopicsList>
          {props.topics.map((topic, index) => {
            return <li key={index}><button>{topic}</button></li>;
          })}
        </StyledTopicsList>
      ) : (
        <div>No topics</div>
      )}
    </>
  );
}

const StyledTopicsList = styled.ul`
  display: flex;
  flex-wrap: wrap;

  gap: 1rem;
  list-style-type: none;
  padding: 0;

  li {
    margin: 0.5rem 0;

    button {
    min-width: 5rem;
    }

  }
`;
