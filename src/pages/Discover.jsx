import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Flame,
  Play,
  Sparkles,
  Star,
  TrendingUp,
  WandSparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  demoMovies,
  genres,
  getMovies,
  searchMovies,
  imageUrl,
} from "../api";
import MovieGrid from "../components/MovieGrid";

const categories = [
  { id: "popular", label: "Popular", endpoint: "movie/popular" },
  { id: "top", label: "Top Rated", endpoint: "movie/top_rated" },
  { id: "new", label: "New Releases", endpoint: "movie/now_playing" },
  { id: "upcoming", label: "Coming Soon", endpoint: "movie/upcoming" },
];

const harryPotter = [
  {
    id: 1001,
    title: "Harry Potter and the Philosopher's Stone",
    release_date: "2001-11-16",
    vote_average: 7.9,
    genre_ids: [12, 14],
    poster_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    overview:
      "A young wizard discovers a magical world and begins his first year at Hogwarts.",
  },
  {
    id: 1002,
    title: "Harry Potter and the Chamber of Secrets",
    release_date: "2002-11-15",
    vote_average: 7.7,
    genre_ids: [12, 14],
    poster_path: "/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
    overview:
      "Harry returns to Hogwarts as a mysterious force threatens the students.",
  },
  {
    id: 1003,
    title: "Harry Potter and the Prisoner of Azkaban",
    release_date: "2004-05-31",
    vote_average: 8.0,
    genre_ids: [12, 14],
    poster_path: "/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
    overview:
      "Harry faces a mystery connected to a dangerous escaped prisoner.",
  },
  {
    id: 1004,
    title: "Harry Potter and the Goblet of Fire",
    release_date: "2005-11-18",
    vote_average: 7.8,
    genre_ids: [12, 14],
    poster_path: "/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg",
    overview:
      "Harry unexpectedly enters a dangerous magical tournament.",
  },
  {
    id: 1005,
    title: "Harry Potter and the Order of the Phoenix",
    release_date: "2007-07-11",
    vote_average: 7.7,
    genre_ids: [12, 14],
    poster_path: "/5aOyriWkPec0zUDxmHFP9qMmBaj.jpg",
    overview:
      "Harry and his friends prepare to face a growing dark threat.",
  },
  {
    id: 1006,
    title: "Harry Potter and the Half-Blood Prince",
    release_date: "2009-07-15",
    vote_average: 7.7,
    genre_ids: [12, 14],
    poster_path: "/z7uo9ghw5gtfOfCfxk3lLXvcf2e.jpg",
    overview:
      "Harry learns more about Voldemort's past as danger approaches Hogwarts.",
  },
  {
    id: 1007,
    title: "Harry Potter and the Deathly Hallows: Part 1",
    release_date: "2010-11-19",
    vote_average: 7.8,
    genre_ids: [12, 14],
    poster_path: "/iGoXIpQb7Pot00EEdwpwPajheZ5.jpg",
    overview:
      "Harry, Ron, and Hermione leave Hogwarts to search for a way to defeat Voldemort.",
  },
  {
    id: 1008,
    title: "Harry Potter and the Deathly Hallows: Part 2",
    release_date: "2011-07-15",
    vote_average: 8.1,
    genre_ids: [12, 14],
    poster_path: "/n5A7brJCnoj8n2vo8pZJ4sW5zHo.jpg",
    overview:
      "The final battle for the wizarding world begins at Hogwarts.",
  },
];

function MovieRail({ title, subtitle, icon: Icon, movies, onOpen }) {
  const uniqueMovies = movies.filter(
    (movie, index, array) =>
      movie && movie.id != null &&
      array.findIndex((item) => item?.id === movie.id) === index
  );

  return (
    <section className="cv-rail-section">
      <div className="cv-rail-heading">
        <div>
          <span className="cv-rail-kicker">
            <Icon size={14} />
            {subtitle}
          </span>
          <h2>{title}</h2>
        </div>

        <Link to="/discover" className="cv-view-all">
          Explore <ArrowRight size={15} />
        </Link>
      </div>

      <div className="cv-movie-rail">
        {uniqueMovies.map((movie) => {
          const poster = imageUrl(movie.poster_path);

          return (
            <button
              type="button"
              className="cv-rail-card"
              key={movie.id}
              onClick={() => onOpen(movie)}
            >
              <div className="cv-rail-poster">
                {poster ? (
                  <img
                    src={poster}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                  />
                ) : (
                  <div className="cv-poster-fallback">
                    <Play size={28} />
                    <span>{movie.title}</span>
                  </div>
                )}

                <span className="cv-rail-rating">
                  <Star size={12} fill="currentColor" />
                  {Number(movie.vote_average || 0).toFixed(1)}
                </span>

                <span className="cv-rail-play">
                  <Play size={19} fill="currentColor" />
                </span>
              </div>

              <strong title={movie.title}>{movie.title}</strong>

              <span className="cv-rail-meta">
                {(movie.release_date || "").slice(0, 4) || "Year unknown"}
                <i>•</i>
                Movie
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default function Discover({ query = "", onOpen }) {
  const [movies, setMovies] = useState(demoMovies);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("popular");
  const [genre, setGenre] = useState("all");
  const [sort, setSort] = useState("popular");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadMovies() {
      setLoading(true);
      setError("");

      try {
        const data = query.trim()
          ? await searchMovies(query.trim())
          : await getMovies(
              categories.find((item) => item.id === category)?.endpoint ||
                "movie/popular"
            );

        if (active && Array.isArray(data) && data.length) {
          setMovies(data);
        } else if (active) {
          setMovies(demoMovies);
        }
      } catch {
        if (active) {
          setError("Live movies are unavailable. Showing sample movies instead.");
          setMovies(demoMovies);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadMovies();

    return () => {
      active = false;
    };
  }, [query, category]);

  const visibleMovies = useMemo(() => {
    let result = movies.filter((movie) =>
      genre === "all"
        ? true
        : (movie.genre_ids || []).includes(Number(genre))
    );

    if (sort === "rating") {
      result = [...result].sort(
        (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
      );
    } else if (sort === "newest") {
      result = [...result].sort((a, b) =>
        (b.release_date || "").localeCompare(a.release_date || "")
      );
    } else if (sort === "az") {
      result = [...result].sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [movies, genre, sort]);

  const featured = movies.find((movie) => movie.backdrop_path) || demoMovies[0];
  const backdrop = imageUrl(featured?.backdrop_path, "original");

  const allMovies = [...movies, ...demoMovies, ...harryPotter].filter(
    (movie, index, array) =>
      movie && movie.id != null &&
      array.findIndex((item) => item?.id === movie.id) === index
  );

  const topRated = [...allMovies].sort(
    (a, b) => (b.vote_average || 0) - (a.vote_average || 0)
  );

  const newest = [...allMovies].sort((a, b) =>
    (b.release_date || "").localeCompare(a.release_date || "")
  );

  if (query.trim()) {
    return (
      <main className="page-shell inner-page">
        <div className="page-intro">
          <span className="cv-rail-kicker">CINEVERSE SEARCH</span>
          <h1>Search results<span className="cv-red-dot">.</span></h1>
          <p>Results for “{query}”</p>
        </div>

        <div className="cv-filter-row">
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            aria-label="Filter by genre"
          >
            <option value="all">All genres</option>
            {genres.map((item) => (
              <option key={item.id} value={String(item.id)}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            aria-label="Sort results"
          >
            <option value="popular">Default order</option>
            <option value="rating">Highest rated</option>
            <option value="newest">Newest first</option>
            <option value="az">A–Z</option>
          </select>
        </div>

        {error && <div className="notice">{error}</div>}

        <MovieGrid
          movies={visibleMovies}
          onOpen={onOpen}
          loading={loading}
          emptyTitle="No films found"
          emptyText="Try a different search or genre."
        />
      </main>
    );
  }

  return (
    <main className="cv-home">
      <section
        className="cv-featured-hero"
        style={
          backdrop
            ? {
                backgroundImage: `linear-gradient(90deg,#050505 0%,rgba(5,5,5,.92) 27%,rgba(5,5,5,.35) 70%,rgba(5,5,5,.15) 100%),linear-gradient(0deg,#050505 0%,transparent 55%),url("${backdrop}")`,
              }
            : {}
        }
      >
        <div className="cv-hero-copy">
          <span className="cv-hero-kicker">
            <Sparkles size={14} /> CINEVERSE ORIGINAL DISCOVERY
          </span>
          <span className="cv-feature-overline">
            FEATURED MOVIE · {featured?.release_date?.slice(0, 4) || "NOW SHOWING"}
          </span>

          <h1>{featured?.title || "Stories worth watching"}</h1>

          <div className="cv-feature-meta">
            <span>
              <Star size={14} fill="currentColor" />
              {Number(featured?.vote_average || 8.4).toFixed(1)} Rating
            </span>
            <span>HD</span>
            <span>Movie</span>
          </div>

          <p>
            {featured?.overview ||
              "Discover unforgettable stories, iconic characters, and your next favourite movie."}
          </p>

          <div className="cv-hero-buttons">
            <button
              className="cv-button cv-button-red"
              onClick={() => onOpen(featured)}
            >
              <Play size={16} fill="currentColor" /> View details
            </button>
            <Link className="cv-button cv-button-glass" to="/watchlist">
              ＋ My List
            </Link>
          </div>
        </div>

        <div className="cv-hero-status">
          <span />
          YOUR NEXT MOVIE NIGHT STARTS HERE
        </div>
      </section>

      <div className="cv-home-content page-shell">
        {error && <div className="notice">{error}</div>}
        {loading && (
          <div className="loading-line">
            <span /> Finding films for you...
          </div>
        )}

        <div className="cv-shortcuts">
          <Link to="/trending">
            <TrendingUp size={20} />
            <strong>Trending Now</strong>
            <span>What's popular</span>
          </Link>
          <Link to="/discover">
            <Flame size={20} />
            <strong>Popular Movies</strong>
            <span>Audience favourites</span>
          </Link>
          <Link to="/discover">
            <Star size={20} />
            <strong>Top Rated</strong>
            <span>Highly rated films</span>
          </Link>
          <Link to="/watchlist">
            <CalendarDays size={20} />
            <strong>My Watchlist</strong>
            <span>Save for later</span>
          </Link>
        </div>

        <MovieRail
          title="Trending Now"
          subtitle="THE MOVIES EVERYONE IS WATCHING"
          icon={TrendingUp}
          movies={allMovies.slice(0, 16)}
          onOpen={onOpen}
        />

        <section className="cv-browse-section">
          <div className="cv-browse-heading">
            <div>
              <span className="cv-rail-kicker">FIND YOUR NEXT FAVOURITE</span>
              <h2>Discover Movies</h2>
            </div>
            <Link to="/discover">Browse all <ArrowRight size={15} /></Link>
          </div>

          <div className="cv-category-tabs">
            {categories.map((item) => (
              <button
                key={item.id}
                className={category === item.id ? "active" : ""}
                onClick={() => {
                  setCategory(item.id);
                  setShowAll(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="cv-filter-row">
            <select
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
              aria-label="Filter by genre"
            >
              <option value="all">All genres</option>
              {genres.map((item) => (
                <option key={item.id} value={String(item.id)}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              aria-label="Sort movies"
            >
              <option value="popular">Default order</option>
              <option value="rating">Highest rated</option>
              <option value="newest">Newest first</option>
              <option value="az">A–Z</option>
            </select>
          </div>

          <p className="cv-results-count">{visibleMovies.length} films to explore</p>

          <MovieGrid
            movies={showAll ? visibleMovies : visibleMovies.slice(0, 12)}
            onOpen={onOpen}
            loading={loading}
            emptyTitle="No films found"
            emptyText="Try another genre or category."
          />

          {!loading && visibleMovies.length > 12 && !showAll && (
            <button className="cv-show-more" onClick={() => setShowAll(true)}>
              Show more films <ChevronRight size={16} />
            </button>
          )}
        </section>

        <MovieRail
          title="Popular Movies"
          subtitle="FAN FAVOURITES"
          icon={Flame}
          movies={allMovies.slice(2, 18)}
          onOpen={onOpen}
        />

        <MovieRail
          title="Harry Potter Collection"
          subtitle="ENTER THE WIZARDING WORLD"
          icon={WandSparkles}
          movies={harryPotter}
          onOpen={onOpen}
        />

        <MovieRail
          title="Top Rated Picks"
          subtitle="WORTH YOUR TIME"
          icon={Star}
          movies={topRated.slice(0, 16)}
          onOpen={onOpen}
        />

        <MovieRail
          title="Recently Released"
          subtitle="FRESH FROM THE SCREEN"
          icon={CalendarDays}
          movies={newest.slice(0, 16)}
          onOpen={onOpen}
        />

        <section className="cv-home-promo">
          <div>
            <span className="cv-rail-kicker">
              <Sparkles size={14} /> YOUR PERSONAL CINEMA
            </span>
            <h2>Make it a movie night.</h2>
            <p>
              Save films you love, track what you have watched, and keep your
              next favourite close.
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
      </div>
    </main>
  );
}
