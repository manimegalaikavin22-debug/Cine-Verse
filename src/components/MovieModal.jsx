
import { useEffect } from "react";
import {
  BookmarkPlus,
  Check,
  Heart,
  Star,
  X,
} from "lucide-react";

import { imageUrl } from "../api";
import { useCollection } from "../CollectionContext";

export default function MovieModal({ movie, onClose }) {
  const {
    isFavorite,
    isInWatchlist,
    isWatched,
    toggleFavorite,
    toggleWatchlist,
    toggleWatched,
  } = useCollection();

  useEffect(() => {
    if (!movie) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [movie, onClose]);

  // IMPORTANT: Check for null before accessing movie properties.
  if (!movie) return null;

  const favorite = isFavorite(movie.id);
  const saved = isInWatchlist(movie.id);
  const watched = isWatched(movie.id);

  const backdrop = imageUrl(
    movie.backdrop_path || movie.poster_path,
    "original"
  );

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <section
        className="movie-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${movie.title || "Movie"} details`}
      >
        <button
          type="button"
          className="modal-close icon-button"
          onClick={onClose}
          aria-label="Close movie details"
        >
          <X size={21} />
        </button>

        <div
          className="modal-hero"
          style={
            backdrop
              ? {
                  backgroundImage: `linear-gradient(0deg, #11131a 0%, rgba(17,19,26,.35) 100%), url("${backdrop}")`,
                }
              : {}
          }
        >
          <span className="eyebrow">
            YOUR NEXT MOVIE NIGHT
          </span>

          <h2>{movie.title || "Untitled movie"}</h2>

          <div className="modal-meta">
            <span className="meta-rating">
              <Star size={15} fill="currentColor" />
              {movie.vote_average
                ? Number(movie.vote_average).toFixed(1)
                : "N/A"}
            </span>

            <span>
              {movie.release_date?.slice(0, 4) || "Year unknown"}
            </span>
          </div>
        </div>

        <div className="modal-content">
          <h3>About this movie</h3>

          <p>
            {movie.overview ||
              "No description is available for this movie yet."}
          </p>

          <div className="modal-actions">
            <button
              type="button"
              className={`action-button ${favorite ? "is-on" : ""}`}
              onClick={() => toggleFavorite(movie)}
            >
              <Heart
                size={17}
                fill={favorite ? "currentColor" : "none"}
              />
              {favorite ? "Favorited" : "Favorite"}
            </button>

            <button
              type="button"
              className={`action-button ${saved ? "is-on" : ""}`}
              onClick={() => toggleWatchlist(movie)}
            >
              <BookmarkPlus size={17} />
              {saved ? "In watchlist" : "Watch later"}
            </button>

            <button
              type="button"
              className={`action-button ${watched ? "is-on" : ""}`}
              onClick={() => toggleWatched(movie)}
            >
              <Check size={17} />
              {watched ? "Watched" : "Mark watched"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}