
import { useEffect, useState } from "react";
import { Flame } from "lucide-react";
import { getMovies, demoMovies } from "../api";
import MovieGrid from "../components/MovieGrid";

export default function Trending({ onOpen }) {
  const [movies, setMovies] = useState(demoMovies);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getMovies("trending/movie/week")
      .then((data) => {
        if (active) setMovies(data);
      })
      .catch(() => {
        if (active) {
          setMovies(demoMovies);
          setError("Live trending movies are unavailable. Showing sample films.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="library-page">
      <section className="page-banner trending-banner">
        <div className="page-banner-icon">
          <Flame size={27} />
        </div>
        <span className="eyebrow">WHAT EVERYONE IS WATCHING</span>
        <h1>
          Trending <span className="accent">Now.</span>
        </h1>
        <p>Discover the films everyone's talking about this week.</p>
      </section>

      <div className="library-heading">
        <div>
          <h2>Popular this week</h2>
          <p>Fresh discoveries for your next movie night.</p>
        </div>
        <span className="library-count">{movies.length} films</span>
      </div>

      {error && <div className="notice">{error}</div>}

      <MovieGrid
        movies={movies}
        onOpen={onOpen}
        loading={loading}
        emptyTitle="No trending films"
        emptyText="Try again later to discover trending movies."
      />
    </main>
  );
}
