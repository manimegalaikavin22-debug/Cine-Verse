
import MovieCard from "./MovieCard";

export default function MovieGrid({
  movies = [],
  onOpen,
  loading = false,
  emptyTitle = "No movies found",
  emptyText = "Try searching for another movie.",
}) {
  if (loading && movies.length === 0) {
    return (
      <div className="movie-grid">
        {Array.from({ length: 14 }, (_, index) => (
          <div className="skeleton-card" key={index}>
            <div className="skeleton-poster" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        ))}
      </div>
    );
  }

  if (!movies.length) {
    return (
      <div className="empty-state">
        <h3>{emptyTitle}</h3>
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onOpen={onOpen}
        />
      ))}
    </div>
  );
}
