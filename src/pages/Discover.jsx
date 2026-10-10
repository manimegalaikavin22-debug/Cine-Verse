import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Clapperboard,
  Flame,
  Play,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  WandSparkles,
  ChevronRight,
} from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  GENRES,
  getMovieCollections,
  getSuggestions,
  searchMovies,
} from "../services/omdb";

import MovieGrid from "../components/MovieGrid";

const categories = [
  { id: "popular", label: "Popular" },
  { id: "topRated", label: "Critically Acclaimed" },
  { id: "animation", label: "Animation" },
  { id: "sciFi", label: "Sci-Fi" },
  { id: "fantasy", label: "Fantasy" },
  { id: "thriller", label: "Thrillers" },
  { id: "comedy", label: "Comedy" },
];

const normalize = (movie) => ({
  ...movie,
  id: movie.imdbID || movie.id,
  imdbID: movie.imdbID || movie.id,
  title: movie.title || movie.Title || "Untitled movie",
  year: movie.year || movie.Year || "",
  release_date:
    movie.release_date ||
    (movie.Year ? `${movie.Year}-01-01` : ""),
  vote_average: Number(movie.vote_average || movie.imdbRating || 0),
  poster_path: movie.poster_path || movie.Poster || "",
  overview: movie.overview || movie.Plot || "",
  type: movie.type || movie.Type || "movie",
});

function dedupe(movies = []) {
  const seen = new Set();

  return movies.map(normalize).filter((movie) => {
    if (!movie.id || seen.has(movie.id)) return false;
    seen.add(movie.id);
    return true;
  });
}

function MovieRail({ title, subtitle, icon: Icon, movies, onOpen }) {
  const items = dedupe(movies);

  return (
    <section className="cv-rail-section">
      <div className="cv-rail-heading">
        <div>
          <span className="cv-rail-kicker">
            <Icon size={14} /> {subtitle}
          </span>
          <h2>{title}</h2>
        </div>

        <Link to="/discover" className="cv-view-all">
          Explore <ArrowRight size={15} />
        </Link>
      </div>

      <div className="cv-movie-rail">
        {items.map((movie) => (
          <button
            type="button"
            className="cv-rail-card"
            key={movie.id}
            onClick={() => onOpen(movie)}
          >
            <div className="cv-rail-poster">
              {movie.poster_path ? (
                <img
                  src={movie.poster_path}
                  alt={`${movie.title} poster`}
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="cv-poster-fallback">
                  <Clapperboard size={28} />
                  <span>{movie.title}</span>
                </div>
              )}

              <span className="cv-rail-rating">
                <Star size={12} fill="currentColor" />
                {movie.vote_average
                  ? movie.vote_average.toFixed(1)
                  : "N/A"}
              </span>

              <span className="cv-rail-play">
                <Play size={19} fill="currentColor" />
              </span>
            </div>

            <strong title={movie.title}>{movie.title}</strong>

            <span className="cv-rail-meta">
              {movie.year || movie.release_date?.slice(0, 4) || "Year unknown"}
              <i>•</i>
              {movie.type || "Movie"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function SearchSuggestions({ initialValue = "", onSearch }) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  function submit(event) {
    event.preventDefault();
    onSearch(value.trim());
  }

  return (
    <form className="cv-live-search" onSubmit={submit}>
      <Search size={19} />

      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search movies, actors, or titles..."
        aria-label="Search movies"
      />

      <button type="submit">Search</button>
    </form>
  );
}

export default function Discover({ onOpen }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const urlQuery = searchParams.get("q") || "";

  const [collections, setCollections] = useState({});
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("Action");
  const [genreMovies, setGenreMovies] = useState([]);
  const [activeCategory, setActiveCategory] = useState("popular");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [genreLoading, setGenreLoading] = useState(false);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Clicking any movie card opens its full details page.
  function openMovie(movie) {
    if (onOpen) {
      onOpen(movie);
      return;
    }

    const movieId = movie?.imdbID || movie?.id;

    if (movieId) {
      navigate(`/movie/${encodeURIComponent(movieId)}`);
    }
  }

  // Put the search term in the URL so it can be refreshed or shared.
  function handleSearch(term) {
    const cleaned = term.trim();

    setShowAll(false);
    setError("");

    if (cleaned) {
      setSearchParams({ q: cleaned });
    } else {
      setSearchParams({});
    }
  }

  // Load collections once.
  useEffect(() => {
    let active = true;

    async function loadCollections() {
      setLoading(true);
      setError("");

      try {
        const data = await getMovieCollections();

        if (!active) return;

        setCollections(data);
        setMovies(data.popular?.movies || []);
      } catch (err) {
        if (active) {
          setError(err.message || "Could not load movie collections.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCollections();

    return () => {
      active = false;
    };
  }, []);

  // Load suggestions for the selected genre.
  useEffect(() => {
    let active = true;

    async function loadGenreSuggestions() {
      setGenreLoading(true);

      try {
        const data = await getSuggestions({
          genre: selectedGenre,
          limit: 30,
        });

        if (active) setGenreMovies(dedupe(data));
      } catch {
        if (active) setGenreMovies([]);
      } finally {
        if (active) setGenreLoading(false);
      }
    }

    loadGenreSuggestions();

    return () => {
      active = false;
    };
  }, [selectedGenre]);

  // Search the OMDb API when the URL query changes.
  useEffect(() => {
    let active = true;
    const term = urlQuery.trim();

    async function loadResults() {
      if (!term) {
        setError("");
        setMovies(collections[activeCategory]?.movies || []);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const results = await searchMovies(term, 1);

        if (!active) return;

        setMovies(dedupe(results));
        setShowAll(false);
      } catch (err) {
        if (!active) return;

        setMovies([]);
        setError(err.message || "Search failed. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    }

    loadResults();

    return () => {
      active = false;
    };
  }, [urlQuery, activeCategory, collections]);

  const visibleMovies = useMemo(() => {
    const result = dedupe(movies);

    if (sort === "rating") {
      result.sort((a, b) => b.vote_average - a.vote_average);
    } else if (sort === "newest") {
      result.sort((a, b) =>
        String(b.year || b.release_date || "").localeCompare(
          String(a.year || a.release_date || "")
        )
      );
    } else if (sort === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [movies, sort]);

  const featured =
    collections.topRated?.movies?.[0] ||
    collections.popular?.movies?.[0] ||
    genreMovies[0];

  const featuredPoster = featured?.poster_path;

  const isSearching = Boolean(urlQuery.trim());

  return (
    <main className="cv-home">
      <section
        className="cv-featured-hero"
        style={
          featuredPoster
            ? {
                backgroundImage: `linear-gradient(90deg,#050505 0%,rgba(5,5,5,.94) 30%,rgba(5,5,5,.45) 75%,rgba(5,5,5,.2) 100%),linear-gradient(0deg,#050505 0%,transparent 65%),url("${featuredPoster}")`,
              }
            : {}
        }
      >
        <div className="cv-hero-copy">
          <span className="cv-hero-kicker">
            <Sparkles size={14} /> CINEVERSE MOVIE DISCOVERY
          </span>

          <span className="cv-feature-overline">MOVIE SPOTLIGHT</span>

          <h1>{featured?.title || "Your next story starts here."}</h1>

          <div className="cv-feature-meta">
            <span>
              <Star size={14} fill="currentColor" />
              {featured?.vote_average
                ? featured.vote_average.toFixed(1)
                : "IMDb rating varies"}
            </span>

            <span>{featured?.year || "Discover"}</span>
            <span>{featured?.type || "Movie"}</span>
          </div>

          <p>
            {featured?.overview ||
              "Discover movies across genres, explore new titles, and build your personal watchlist."}
          </p>

          <div className="cv-hero-buttons">
            <button
              type="button"
              className="cv-button cv-button-red"
              onClick={() => featured && openMovie(featured)}
              disabled={!featured}
            >
              <Play size={16} fill="currentColor" /> View details
            </button>

            <Link className="cv-button cv-button-glass" to="/watchlist">
              + My List
            </Link>
          </div>
        </div>

        <div className="cv-hero-status">
          <span /> MOVIE DATA POWERED BY OMDb
        </div>
      </section>

      <div className="cv-home-content page-shell">
        <SearchSuggestions
          initialValue={urlQuery}
          onSearch={handleSearch}
        />

        {error && <div className="notice">{error}</div>}

        <div className="cv-shortcuts">
          <a href="#live-collections">
            <TrendingUp size={20} />
            <strong>Discover All</strong>
            <span>Explore movie collections</span>
          </a>

          <a href="#genre-discovery">
            <WandSparkles size={20} />
            <strong>By Genre</strong>
            <span>Find your kind of story</span>
          </a>

          <Link to="/watchlist">
            <CalendarDays size={20} />
            <strong>My Watchlist</strong>
            <span>Save for later</span>
          </Link>

          <a href="#movie-results">
            <Flame size={20} />
            <strong>Movie Search</strong>
            <span>Search the OMDb catalogue</span>
          </a>
        </div>

        {!isSearching && (
          <div id="live-collections">
            {categories.map((category) => (
              <MovieRail
                key={category.id}
                title={collections[category.id]?.title || category.label}
                subtitle="DISCOVER YOUR NEXT FAVOURITE"
                icon={category.id === "popular" ? Flame : Sparkles}
                movies={collections[category.id]?.movies || []}
                onOpen={openMovie}
              />
            ))}
          </div>
        )}

        <section className="cv-browse-section" id="genre-discovery">
          <div className="cv-browse-heading">
            <div>
              <span className="cv-rail-kicker">PERSONALISED DISCOVERY</span>
              <h2>Explore by genre</h2>
            </div>
          </div>

          <div className="cv-category-tabs">
            {GENRES.map((item) => (
              <button
                type="button"
                key={item}
                className={selectedGenre === item ? "active" : ""}
                onClick={() => setSelectedGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {genreLoading && (
            <div className="loading-line">
              <span /> Finding {selectedGenre.toLowerCase()} movies...
            </div>
          )}

          <MovieGrid
            movies={genreMovies}
            onOpen={openMovie}
            loading={genreLoading}
            emptyTitle="No suggestions available"
            emptyText="Try another genre."
          />
        </section>

        <section className="cv-browse-section" id="movie-results">
          <div className="cv-browse-heading">
            <div>
              <span className="cv-rail-kicker">
                {isSearching ? "SEARCH RESULTS" : "EXPLORE THE CATALOGUE"}
              </span>

              <h2>
                {isSearching
                  ? `Results for "${urlQuery}"`
                  : "All suggested movies"}
              </h2>
            </div>
          </div>

          <div className="cv-category-tabs">
            {categories.map((item) => (
              <button
                type="button"
                key={item.id}
                className={activeCategory === item.id ? "active" : ""}
                onClick={() => {
                  setActiveCategory(item.id);
                  setShowAll(false);

                  if (urlQuery) {
                    setSearchParams({});
                  }
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="cv-filter-row">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort movies"
            >
              <option value="popular">Default order</option>
              <option value="rating">Highest IMDb rating</option>
              <option value="newest">Newest year first</option>
              <option value="az">A–Z</option>
            </select>
          </div>

          <p className="cv-results-count">
            {visibleMovies.length} results in the current selection
          </p>

          {loading && (
            <div className="loading-line">
              <span /> Searching OMDb...
            </div>
          )}

          <MovieGrid
            movies={showAll ? visibleMovies : visibleMovies.slice(0, 24)}
            onOpen={openMovie}
            loading={loading}
            emptyTitle="No movies found"
            emptyText="Try a different title or collection."
          />

          {!loading && visibleMovies.length > 24 && !showAll && (
            <button
              type="button"
              className="cv-show-more"
              onClick={() => setShowAll(true)}
            >
              Show more movies <ChevronRight size={16} />
            </button>
          )}
        </section>

        {!isSearching && (
          <MovieRail
            title="The Wizarding World"
            subtitle="MAGIC NEVER GETS OLD"
            icon={WandSparkles}
            movies={(collections.fantasy?.movies || []).filter((movie) =>
              /harry potter|fantastic beasts/i.test(movie.title)
            )}
            onOpen={openMovie}
          />
        )}

        <section className="cv-home-promo">
          <div>
            <span className="cv-rail-kicker">
              <Sparkles size={14} /> YOUR PERSONAL CINEMA
            </span>

            <h2>Make it a movie night.</h2>

            <p>
              Discover new titles, save films you love, and keep your next
              favourite close.
            </p>

            <Link to="/watchlist" className="cv-button cv-button-red">
              Open My List <ArrowRight size={16} />
            </Link>
          </div>

          <div className="cv-promo-logo">
            CINE<span>VERSE</span>
            <small>YOUR NEXT STORY STARTS HERE</small>
          </div>
        </section>

        <p className="cv-attribution">
          Movie data provided by OMDb API. Catalogue coverage depends on
          the OMDb service and your API plan.
        </p>
      </div>
    </main>
  );
}