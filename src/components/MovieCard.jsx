import { useState } from "react";
import {
  Heart,
  BookmarkPlus,
  Check,
  Star,
  Clapperboard,
} from "lucide-react";
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

  const movieId = movie.imdbID || movie.id;
  const title = movie.title || movie.Title || "Untitled movie";

  const poster =
    movie.poster_path ||
    (movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "");

  const rating =
    movie.imdbRating && movie.imdbRating !== "N/A"
      ? movie.imdbRating
      : movie.vote_average;

  const year =
    movie.year ||
    movie.Year ||
    movie.release_date?.slice(0, 4) ||
    "";

  const [imageFailed, setImageFailed] = useState(false);

  const genreNames = Array.isArray(movie.genres)
    ? movie.genres
        .map((genre) =>
          typeof genre === "string" ? genre : genre?.name
        )
        .filter(Boolean)
        .slice(0, 2)
    : typeof movie.Genre === "string"
      ? movie.Genre.split(",").map((genre) => genre.trim()).slice(0, 2)
      : [];

  function openMovie() {
    if (onOpen) onOpen(movie);
  }

  function handleAction(event, action) {
    event.stopPropagation();
    action(movie);
  }

  const favorite = isFavorite(movieId);
  const inWatchlist = isInWatchlist(movieId);
  const watched = isWatched(movieId);

  return (
    <article className="movie-card">
      <button
        type="button"
        className="poster-button"
        onClick={openMovie}
        aria-label={`View details for ${title}`}
      >
        {poster && !imageFailed ? (
          <img
            src={poster}
            alt={`${title} poster`}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="poster-placeholder">
            <Clapperboard size={32} />
            <strong>{title}</strong>
            <span>Poster unavailable</span>
          </div>
        )}

        <span className="poster-rating">
          <Star size={12} fill="currentColor" />
          {rating && rating !== "N/A" && Number(rating) > 0
            ? Number(rating).toFixed(1)
            : "N/A"}
        </span>

        {year && <span className="new-ribbon">{year}</span>}
      </button>

      <div className="movie-card-info">
        <button
          type="button"
          className="movie-title"
          onClick={openMovie}
          title={`View ${title} details`}
        >
          {title}
        </button>

        <span className="movie-genre">
          {genreNames.join(" / ") || "Movie"}
        </span>

        <span className="movie-year">{year || "Year unknown"}</span>

        <div className="card-actions">
          <button
            type="button"
            className={`small-action ${favorite ? "active" : ""}`}
            onClick={(event) =>
              handleAction(event, toggleFavorite)
            }
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            title={favorite ? "Remove favorite" : "Add to favorites"}
          >
            <Heart size={15} fill={favorite ? "currentColor" : "none"} />
          </button>

          <button
            type="button"
            className={`small-action ${inWatchlist ? "active" : ""}`}
            onClick={(event) =>
              handleAction(event, toggleWatchlist)
            }
            aria-label={inWatchlist ? "Remove from watchlist" : "Add to watchlist"}
            title={inWatchlist ? "Remove from watchlist" : "Watch later"}
          >
            <BookmarkPlus size={15} />
          </button>

          <button
            type="button"
            className={`small-action ${watched ? "active" : ""}`}
            onClick={(event) =>
              handleAction(event, toggleWatched)
            }
            aria-label={watched ? "Mark as unwatched" : "Mark as watched"}
            title={watched ? "Mark as unwatched" : "Mark as watched"}
          >
            <Check size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}