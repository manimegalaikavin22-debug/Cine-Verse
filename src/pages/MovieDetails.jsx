import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  Globe,
  Star,
  Clapperboard,
  ExternalLink,
  LoaderCircle,
} from "lucide-react";
import { getMovieDetails } from "../services/omdb";
import "./MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadMovie() {
      setLoading(true);
      setError("");
      setMovie(null);

      try {
        const result = await getMovieDetails(id);

        if (!result) {
          throw new Error("Movie details could not be found.");
        }

        if (active) setMovie(result);
      } catch (err) {
        if (active) {
          setError(err.message || "Unable to load movie details.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (id) loadMovie();

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="movie-details-state">
        <LoaderCircle className="movie-spinner" size={38} />
        <p>Discovering your movie...</p>
      </main>
    );
  }

  if (error || !movie) {
    return (
      <main className="movie-details-state">
        <Clapperboard size={42} />
        <h2>Movie not found</h2>
        <p>{error || "No details are available for this movie."}</p>
        <Link to="/discover" className="md-back-button">
          <ArrowLeft size={17} /> Back to Discover
        </Link>
      </main>
    );
  }

  const title = movie.title || movie.Title || "Untitled";
  const poster = movie.poster_path || movie.Poster;
  const year = movie.year || movie.Year || movie.release_date?.slice(0, 4);
  const rating = movie.imdbRating || movie.vote_average;
  const plot = movie.overview || movie.Plot || "No plot summary is available.";
  const genres = Array.isArray(movie.genres)
    ? movie.genres.map((genre) =>
        typeof genre === "string" ? genre : genre.name
      )
    : typeof movie.Genre === "string"
      ? movie.Genre.split(",").map((genre) => genre.trim())
      : [];

  const director = movie.director || movie.Director;
  const actors = movie.actors || movie.Actors;
  const runtime = movie.runtime || movie.Runtime;
  const language = movie.language || movie.Language;
  const released = movie.released || movie.Released;
  const awards = movie.awards || movie.Awards;
  const rated = movie.rated || movie.Rated;
  const writer = movie.Writer;
  const country = movie.Country;
  const boxOffice = movie.BoxOffice;
  const imdbID = movie.imdbID || movie.id || id;

  const trailerSearch = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    `${title} ${year || ""} official trailer`
  )}`;

  return (
    <main className="movie-details-page">
      <div className="md-topbar">
        <Link to="/discover" className="md-back-button">
          <ArrowLeft size={17} /> Back to Discover
        </Link>
        <span className="md-brand">
          <Clapperboard size={18} /> CINEVERSE
        </span>
      </div>

      <section className="md-hero">
        <div className="md-backdrop" />

        <div className="md-content">
          <div className="md-poster-wrap">
            {poster && poster !== "N/A" ? (
              <img className="md-poster" src={poster} alt={`${title} poster`} />
            ) : (
              <div className="md-no-poster">
                <Clapperboard size={48} />
                <span>Poster unavailable</span>
              </div>
            )}
          </div>

          <div className="md-information">
            <span className="md-eyebrow">MOVIE DETAILS</span>

            <h1>{title}</h1>

            <div className="md-meta">
              {year && (
                <span>
                  <CalendarDays size={15} /> {year}
                </span>
              )}
              {runtime && runtime !== "N/A" && (
                <span>
                  <Clock3 size={15} /> {runtime}
                </span>
              )}
              {rated && rated !== "N/A" && <span>{rated}</span>}
            </div>

            {genres.length > 0 && (
              <div className="md-genres">
                {genres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </div>
            )}

            {rating && rating !== "N/A" && (
              <div className="md-rating">
                <Star size={20} fill="currentColor" />
                <strong>{rating}</strong>
                <span>/ 10 IMDb</span>
                {movie.imdbVotes && movie.imdbVotes !== "N/A" && (
                  <span className="md-votes">
                    {movie.imdbVotes} votes
                  </span>
                )}
              </div>
            )}

            <h2>Synopsis</h2>
            <p className="md-plot">{plot}</p>

            <div className="md-actions">
              <a
                href={trailerSearch}
                target="_blank"
                rel="noreferrer"
                className="md-primary-button"
              >
                <Clapperboard size={18} /> Watch Trailer
                <ExternalLink size={15} />
              </a>

              {imdbID && (
                <a
                  href={`https://www.imdb.com/title/${imdbID}/`}
                  target="_blank"
                  rel="noreferrer"
                  className="md-secondary-button"
                >
                  View on IMDb <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="md-extra">
        <div className="md-section-heading">
          <span>01</span>
          <h2>Behind the Movie</h2>
        </div>

        <div className="md-detail-grid">
          <Detail label="Director" value={director} />
          <Detail label="Writer" value={writer} />
          <Detail label="Cast" value={actors} />
          <Detail label="Language" value={language} icon={<Globe size={16} />} />
          <Detail label="Country" value={country} />
          <Detail label="Release Date" value={released} />
          <Detail label="Awards" value={awards} />
          <Detail label="Box Office" value={boxOffice} />
          <Detail label="Metascore" value={movie.metascore || movie.Metascore} />
          <Detail label="IMDb Votes" value={movie.imdbVotes} />
        </div>
      </section>
    </main>
  );
}

function Detail({ label, value, icon }) {
  if (!value || value === "N/A") return null;

  return (
    <article className="md-detail-card">
      <div className="md-detail-label">
        {icon}
        <span>{label}</span>
      </div>
      <p>{value}</p>
    </article>
  );
}