// function Aside()
export function MainSection({ lessonEntries }) {
  return (
    <main className="mainSection">
      <section className="lessonsSection">
        <h2 className="lessonsSectionTitle">Lessons so far...</h2>
        <br />
        {lessonEntries.map((lesson) => (
          <article className="lessonCard" key={lesson.id}>
            <header>
              <h3 className="lessonCardTitle">{lesson.title}</h3>
            </header>
            <p className="lessonCardDescription">{lesson.description}</p>
          </article>
        ))}
        <br />
      </section>
    </main>
  );
}
