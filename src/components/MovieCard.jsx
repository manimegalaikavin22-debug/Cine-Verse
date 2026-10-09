
import { Heart, BookmarkPlus, Check, Star } from "lucide-react";
import { imageUrl, genres } from "../api";
import { useCollection } from "../CollectionContext";

export default function MovieCard({ movie, onOpen }) {
  const {
    isFavorite,
    isInWatchlist,
    isWatched,
    toggleFavorite,
    toggleWatchlist,
    toggleWatched,
  } = useCollection();

  const genreNames = (movie.genre_ids || [])
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean)
    .slice(0, 2);

  return (
    <article className="movie-card">
      <button
        className="poster-button"
        onClick={() => onOpen(movie)}
        aria-label={`View ${movie.title}`}
      >
        {movie.poster_path ? (
          <img
            src={imageUrl(movie.poster_path)}
            alt={`${movie.title} poster`}
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">
            <span>🎬</span>
            <strong>{movie.title}</strong>
          </div>
        )}

        <span className="poster-rating">
          <Star size={12} fill="currentColor" />
          {movie.vote_average
            ? Number(movie.vote_average).toFixed(1)
            : "N/A"}
        </span>

        {movie.release_date && (
          <span className="new-ribbon">NEW</span>
        )}
      </button>

      <div className="movie-card-info">
        <button className="movie-title" onClick={() => onOpen(movie)}>
          {movie.title}
        </button>
        <span className="movie-genre">
          {genreNames.join(" / ") || "Film"}
        </span>
        <span className="movie-year">
          {(movie.release_date || "").slice(0, 4) || "Year unknown"}
        </span>

        <div className="card-actions">
          <button
            className={`small-action ${
              isFavorite(movie.id) ? "active" : ""
            }`}
            onClick={() => toggleFavorite(movie)}
            aria-label="Toggle favorite"
            title="Favorite"
          >
            <Heart
              size={15}
              fill={isFavorite(movie.id) ? "currentColor" : "none"}
            />
          </button>

          <button
            className={`small-action ${
              isInWatchlist(movie.id) ? "active" : ""
            }`}
            onClick={() => toggleWatchlist(movie)}
            aria-label="Toggle watchlist"
            title="Watch later"
          >
            <BookmarkPlus size={15} />
          </button>

          <button
            className={`small-action ${
              isWatched(movie.id) ? "active" : ""
            }`}
            onClick={() => toggleWatched(movie)}
            aria-label="Toggle watched"
            title="Watched"
          >
            <Check size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}
