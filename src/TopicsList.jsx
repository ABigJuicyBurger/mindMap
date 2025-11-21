export function TopicsList(props) {
  return (
    <>
      {!props.topics ? (
        <div>Loading</div>
      ) : props.topics.length > 0 ? (
        <ul className="topics">
          {props.topics.map((topic, index) => {
            return <li key={index}>{topic}</li>;
          })}
        </ul>
      ) : (
        <div>No topics</div>
      )}
    </>
  );
}
