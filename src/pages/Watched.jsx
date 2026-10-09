
import { useCollection } from "../CollectionContext";
import { CircleCheck } from "lucide-react";
import MovieGrid from "../components/MovieGrid";

export default function Watched({ onOpen }) {
  const { watched = [] } = useCollection();

  return (
    <main className="library-page">
      <section className="page-banner collection-banner">
        <div className="page-banner-icon">
          <CircleCheck size={27} />
        </div>
        <span className="eyebrow">YOUR CINEMATIC JOURNEY</span>
        <h1>
          Already <span className="accent">Watched.</span>
        </h1>
        <p>Every movie you've watched becomes part of your story.</p>
      </section>

      <div className="library-heading">
        <div>
          <h2>Completed movies</h2>
          <p>Look back at the films you've finished.</p>
        </div>
        <span className="library-count">
          {watched.length} films
        </span>
      </div>

      <MovieGrid
        movies={watched}
        onOpen={onOpen}
        loading={false}
        emptyTitle="Nothing watched yet"
        emptyText="Use the checkmark on a movie to add it here."
      />
    </main>
  );
}
