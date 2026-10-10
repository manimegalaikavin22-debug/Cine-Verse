
const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const OMDB_URL = "https://www.omdbapi.com/";

export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10751, name: "Family" },
];

// Accepts either a complete poster URL or a legacy TMDB image path.
export const imageUrl = (path, size = "w500") => {
  if (!path || path === "N/A") return "";
  if (/^https?:\/\//i.test(path)) return path;

  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Local fallback catalogue. These movies remain available
// when OMDb is not configured or cannot be reached.
export const demoMovies = [
  {
    id: "tt10872600",
    imdbID: "tt10872600",
    title: "Spider-Man: No Way Home",
    release_date: "2021-12-15",
    vote_average: 8.2,
    genre_ids: [28, 12, 878],
    poster_path: "",
    backdrop_path: "",
    overview: "Peter Parker faces the consequences of his identity being revealed.",
  },
  {
    id: "tt9362722",
    imdbID: "tt9362722",
    title: "Spider-Man: Across the Spider-Verse",
    release_date: "2023-05-31",
    vote_average: 8.6,
    genre_ids: [16, 28, 12],
    poster_path: "",
    backdrop_path: "",
    overview: "Miles Morales travels across the multiverse and meets other Spider-People.",
  },
  {
    id: "tt1877830",
    imdbID: "tt1877830",
    title: "The Batman",
    release_date: "2022-03-04",
    vote_average: 7.8,
    genre_ids: [80, 18, 53],
    poster_path: "",
    backdrop_path: "",
    overview: "Batman investigates corruption and mysterious crimes in Gotham.",
  },
  {
    id: "tt0816692",
    imdbID: "tt0816692",
    title: "Interstellar",
    release_date: "2014-11-07",
    vote_average: 8.7,
    genre_ids: [12, 18, 878],
    poster_path: "",
    backdrop_path: "",
    overview: "Explorers travel beyond Earth to search for humanity's future.",
  },
  {
    id: "tt1375666",
    imdbID: "tt1375666",
    title: "Inception",
    release_date: "2010-07-16",
    vote_average: 8.8,
    genre_ids: [28, 878, 12],
    poster_path: "",
    backdrop_path: "",
    overview: "A skilled thief enters dreams to carry out an unusual heist.",
  },
  {
    id: "tt0468569",
    imdbID: "tt0468569",
    title: "The Dark Knight",
    release_date: "2008-07-18",
    vote_average: 9.0,
    genre_ids: [28, 80, 18],
    poster_path: "",
    backdrop_path: "",
    overview: "Batman faces a criminal mastermind who threatens Gotham.",
  },
  {
    id: "tt0241527",
    imdbID: "tt0241527",
    title: "Harry Potter and the Philosopher's Stone",
    release_date: "2001-11-16",
    vote_average: 7.9,
    genre_ids: [12, 14],
    poster_path: "",
    backdrop_path: "",
    overview: "A young wizard discovers a magical world and begins his journey at Hogwarts.",
  },
  {
    id: "tt0295297",
    imdbID: "tt0295297",
    title: "Harry Potter and the Chamber of Secrets",
    release_date: "2002-11-15",
    vote_average: 7.7,
    genre_ids: [12, 14],
    poster_path: "",
    backdrop_path: "",
    overview: "Harry returns to Hogwarts as mysterious events threaten the school.",
  },
  {
    id: "tt0330373",
    imdbID: "tt0330373",
    title: "Harry Potter and the Prisoner of Azkaban",
    release_date: "2004-06-04",
    vote_average: 8.0,
    genre_ids: [12, 14],
    poster_path: "",
    backdrop_path: "",
    overview: "Harry learns about his past as a dangerous prisoner escapes.",
  },
  {
    id: "tt4633694",
    imdbID: "tt4633694",
    title: "Spider-Man: Into the Spider-Verse",
    release_date: "2018-12-14",
    vote_average: 8.4,
    genre_ids: [16, 28, 12],
    poster_path: "",
    backdrop_path: "",
    overview: "Miles Morales discovers what it means to be Spider-Man.",
  },
  {
    id: "tt4154796",
    imdbID: "tt4154796",
    title: "Avengers: Endgame",
    release_date: "2019-04-26",
    vote_average: 8.4,
    genre_ids: [28, 12, 878],
    poster_path: "",
    backdrop_path: "",
    overview: "The Avengers attempt to reverse the devastating events of the past.",
  },
  {
    id: "tt0109830",
    imdbID: "tt0109830",
    title: "Forrest Gump",
    release_date: "1994-07-06",
    vote_average: 8.8,
    genre_ids: [18, 35],
    poster_path: "",
    backdrop_path: "",
    overview: "A kind-hearted man recounts the remarkable events of his life.",
  },
];

function requireApiKey() {
  if (!OMDB_API_KEY || OMDB_API_KEY === "PASTE_YOUR_API_KEY_HERE") {
    throw new Error(
      "OMDb API key missing. Add VITE_OMDB_API_KEY to your .env file."
    );
  }
}

function mapOMDbMovie(movie) {
  const year = Number.parseInt(movie.Year, 10);

  return {
    id: movie.imdbID,
    imdbID: movie.imdbID,
    title: movie.Title || "Untitled",
    release_date: Number.isNaN(year) ? "" : `${year}-01-01`,
    vote_average: Number(movie.imdbRating) || 0,
    genre_ids: [],
    poster_path: movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "",
    backdrop_path: "",
    overview: movie.Plot && movie.Plot !== "N/A"
      ? movie.Plot
      : "No plot summary is available.",
    media_type: movie.Type === "series" ? "tv" : "movie",
    imdbRating: movie.imdbRating || "N/A",
    imdbVotes: movie.imdbVotes || "N/A",
    runtime: movie.Runtime || "N/A",
    genre: movie.Genre || "N/A",
    director: movie.Director || "N/A",
    actors: movie.Actors || "N/A",
  };
}

async function requestOMDb(params) {
  requireApiKey();

  const url = new URL(OMDB_URL);

  url.search = new URLSearchParams({
    apikey: OMDB_API_KEY,
    r: "json",
    ...params,
  }).toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OMDb request failed (${response.status}).`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "OMDb request failed.");
  }

  return data;
}

// Home page categories use local movies because OMDb does not
// provide TMDB-style popular, trending, or upcoming endpoints.
export async function getMovies(endpoint = "movie/popular") {
  return [...demoMovies];
}

// Search OMDb by title. Page numbers are supported by OMDb.
export async function searchMovies(query, page = 1) {
  const term = query?.trim();

  if (!term) return [...demoMovies];

  const data = await requestOMDb({
    s: term,
    type: "movie",
    page: String(page),
  });

  return (data.Search || []).map(mapOMDbMovie);
}

// Fetch full information for a movie by IMDb ID.
export async function getMovieDetails(imdbID) {
  const data = await requestOMDb({
    i: imdbID,
    plot: "full",
  });

  return mapOMDbMovie(data);
}
