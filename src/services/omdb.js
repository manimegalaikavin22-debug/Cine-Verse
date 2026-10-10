const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

const GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Thriller",
];

const GENRE_SEARCH_TERMS = {
  Action: ["mission impossible", "john wick", "the avengers"],
  Adventure: ["jurassic park", "indiana jones", "avatar"],
  Animation: ["toy story", "inside out", "kung fu panda"],
  Comedy: ["home alone", "the mask", "rush hour"],
  Crime: ["the godfather", "goodfellas", "the departed"],
  Documentary: ["planet earth", "free solo", "the last dance"],
  Drama: ["the shawshank redemption", "forrest gump", "whiplash"],
  Family: ["harry potter", "paddington", "the lion king"],
  Fantasy: ["harry potter", "the lord of the rings", "fantastic beasts"],
  Horror: ["the conjuring", "insidious", "a nightmare on elm street"],
  Mystery: ["knives out", "sherlock holmes", "gone girl"],
  Romance: ["the notebook", "pride and prejudice", "la la land"],
  "Science Fiction": ["interstellar", "the matrix", "dune"],
  Thriller: ["inception", "se7en", "shutter island"],
};

function normalizeMovie(movie) {
  const year = movie.Year || "";
  const parsedRating = Number(movie.imdbRating);

  return {
    id: movie.imdbID,
    imdbID: movie.imdbID,
    title: movie.Title || "Untitled movie",
    year,
    release_date: year ? `${year}-01-01` : "",
    vote_average:
      Number.isFinite(parsedRating) && movie.imdbRating !== "N/A"
        ? parsedRating
        : 0,
    imdbRating: movie.imdbRating || "N/A",
    genre_ids: [],
    genres:
      movie.Genre && movie.Genre !== "N/A"
        ? movie.Genre.split(",").map((item) => item.trim())
        : [],
    poster_path:
      movie.Poster && movie.Poster !== "N/A" ? movie.Poster : "",
    backdrop_path: "",
    overview:
      movie.Plot && movie.Plot !== "N/A"
        ? movie.Plot
        : "No plot summary is available yet.",
    type: movie.Type || "movie",
    director: movie.Director || "N/A",
    actors: movie.Actors || "N/A",
    runtime: movie.Runtime || "N/A",
    rated: movie.Rated || "N/A",
    language: movie.Language || "N/A",
    awards: movie.Awards || "N/A",
    released: movie.Released || "N/A",
    metascore: movie.Metascore || "N/A",
    imdbVotes: movie.imdbVotes || "N/A",
    imdbURL: movie.imdbID
      ? `https://www.imdb.com/title/${movie.imdbID}/`
      : "",
  };
}

async function requestOMDb(params = {}) {
  if (!API_KEY) {
    throw new Error(
      "OMDb API key is missing. Add VITE_OMDB_API_KEY to your .env file."
    );
  }

  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  let response;

  try {
    response = await fetch(url.toString());
  } catch {
    throw new Error(
      "Unable to connect to OMDb. Check your internet connection and try again."
    );
  }

  if (!response.ok) {
    throw new Error(`OMDb request failed with status ${response.status}.`);
  }

  const data = await response.json();

  if (data.Response === "False") {
    if (data.Error === "Movie not found!") return null;

    throw new Error(data.Error || "OMDb request failed.");
  }

  return data;
}

export async function searchMovies(query, page = 1, type = "") {
  if (!query?.trim()) return [];

  const params = {
    s: query.trim(),
    page,
  };

  if (type) params.type = type;

  const data = await requestOMDb(params);

  if (!data?.Search) return [];

  return data.Search.map(normalizeMovie);
}

export async function getMovieDetails(imdbID) {
  if (!imdbID) {
    throw new Error("A movie IMDb ID is required.");
  }

  const data = await requestOMDb({
    i: imdbID,
    plot: "full",
  });

  return data ? normalizeMovie(data) : null;
}

export async function searchAllTypes(query, page = 1) {
  if (!query?.trim()) return [];

  const responses = await Promise.all([
    searchMovies(query, page, "movie"),
    searchMovies(query, page, "series"),
  ]);

  const unique = new Map();

  responses.flat().forEach((movie) => {
    if (movie?.imdbID) unique.set(movie.imdbID, movie);
  });

  return [...unique.values()];
}

export async function getSuggestions({
  genre = "Action",
  page = 1,
  limit = 24,
} = {}) {
  const terms = GENRE_SEARCH_TERMS[genre] || GENRE_SEARCH_TERMS.Action;

  const results = await Promise.all(
    terms.map(async (term) => {
      try {
        return await searchMovies(term, page);
      } catch {
        return [];
      }
    })
  );

  const unique = new Map();

  results.flat().forEach((movie) => {
    if (movie?.imdbID) unique.set(movie.imdbID, movie);
  });

  return [...unique.values()].slice(0, limit);
}

export async function getMovieCollections() {
  const collections = [
    {
      key: "popular",
      title: "Popular Movies",
      terms: ["the avengers", "avatar", "batman"],
    },
    {
      key: "topRated",
      title: "Critically Acclaimed",
      terms: ["the shawshank redemption", "the godfather", "schindler's list"],
    },
    {
      key: "animation",
      title: "Animation",
      terms: ["toy story", "inside out", "spirited away"],
    },
    {
      key: "sciFi",
      title: "Science Fiction",
      terms: ["interstellar", "the matrix", "dune"],
    },
    {
      key: "fantasy",
      title: "Fantasy Worlds",
      terms: ["harry potter", "the lord of the rings", "fantastic beasts"],
    },
    {
      key: "thriller",
      title: "Thrillers",
      terms: ["inception", "gone girl", "shutter island"],
    },
    {
      key: "comedy",
      title: "Comedy Night",
      terms: ["home alone", "the mask", "rush hour"],
    },
  ];

  const results = await Promise.all(
    collections.map(async (collection) => {
      const batches = await Promise.all(
        collection.terms.map(async (term) => {
          try {
            return await searchMovies(term);
          } catch {
            return [];
          }
        })
      );

      const unique = new Map();

      batches.flat().forEach((movie) => {
        if (movie?.imdbID) unique.set(movie.imdbID, movie);
      });

      return [
        collection.key,
        {
          title: collection.title,
          movies: [...unique.values()],
        },
      ];
    })
  );

  return Object.fromEntries(results);
}

export { GENRES };