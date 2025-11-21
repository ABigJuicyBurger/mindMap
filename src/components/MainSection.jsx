// function Aside()
export function MainSection({ lessonEntries }) {
  return (
    <main>
      <section className="lessonsSection">
        <h2>Lessons so far...</h2>
        <br />
        {lessonEntries.map((lesson) => (
          <article key={lesson.id}>
            <header>
              <h3>{lesson.title}</h3>
            </header>
            <p>{lesson.lesson}</p>
          </article>
        ))}
        <br />
      </section>
    </main>
  );
}
