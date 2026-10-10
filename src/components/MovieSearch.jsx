import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, LoaderCircle, Film } from "lucide-react";
import { searchAllTypes } from "../services/omdb";
import MovieGrid from "./MovieGrid";
import "./MovieSearch.css";

export default function MovieSearch() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch(event) {
    event.preventDefault();

    const searchTerm = query.trim();

    if (!searchTerm) {
      setError("Please enter a movie or series name.");
      setResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setError("");
    setSearched(true);

    try {
      const movies = await searchAllTypes(searchTerm);

      setResults(movies);

      if (movies.length === 0) {
        setError(`No results found for "${searchTerm}". Try another title.`);
      }
    } catch (err) {
      setResults([]);
      setError(err.message || "Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function clearSearch() {
    setQuery("");
    setResults([]);
    setError("");
    setSearched(false);
  }

  function openMovie(movie) {
    const id = movie.imdbID || movie.id;

    if (id) {
      navigate(`/movie/${encodeURIComponent(id)}`);
    }
  }

  return (
    <section className="cine-search">
      <div className="cine-search-heading">
        <span className="cine-search-eyebrow">YOUR NEXT MOVIE NIGHT</span>
        <h1>
          Find your next <span>favorite.</span>
        </h1>
        <p>Search movies and series, explore their stories, and build your watchlist.</p>
      </div>

      <form className="cine-search-form" onSubmit={handleSearch}>
        <Search size={21} className="cine-search-icon" />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search movies, actors, or series..."
          aria-label="Search movies and series"
        />

        {query && (
          <button
            type="button"
            className="cine-search-clear"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}

        <button
          type="submit"
          className="cine-search-button"
          disabled={loading}
        >
          {loading ? (
            <>
              <LoaderCircle size={17} className="cine-search-spinner" />
              Searching
            </>
          ) : (
            <>
              <Search size={17} />
              Search
            </>
          )}
        </button>
      </form>

      {error && (
        <p className={`cine-search-message ${results.length ? "" : "is-error"}`}>
          {error}
        </p>
      )}

      {loading && (
        <div className="cine-search-loading">
          <LoaderCircle size={28} className="cine-search-spinner" />
          <span>Finding movies for you...</span>
        </div>
      )}

      {!loading && searched && results.length > 0 && (
        <div className="cine-search-results">
          <div className="cine-search-results-heading">
            <div>
              <h2>Search results</h2>
              <p>
                {results.length} results for <strong>"{query.trim()}"</strong>
              </p>
            </div>

            <button
              type="button"
              className="cine-search-reset"
              onClick={clearSearch}
            >
              Clear results
            </button>
          </div>

          <MovieGrid
            movies={results}
            loading={false}
            onOpen={openMovie}
            emptyTitle="No movies found"
            emptyText="Try searching with another title."
          />
        </div>
      )}

      {!searched && !loading && (
        <div className="cine-search-hint">
          <Film size={19} />
          <span>Enter a title and press Search or hit Enter.</span>
        </div>
      )}
    </section>
  );
}