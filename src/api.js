
// src/api.js

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

export const imageUrl = (path, size = "w500") => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

// Sample catalog. Uses TMDB poster paths for movie artwork.
export const demoMovies = [
  // Popular movies
  {
    id: 1,
    title: "Spider-Man: No Way Home",
    release_date: "2021-12-15",
    vote_average: 8.2,
    genre_ids: [28, 12, 878],
    poster_path: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop_path: "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    overview: "Peter Parker faces the consequences of his identity being revealed."
  },
  {
    id: 2,
    title: "Spider-Man: Across the Spider-Verse",
    release_date: "2023-05-31",
    vote_average: 8.4,
    genre_ids: [16, 28, 12],
    poster_path: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdrop_path: "/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    overview: "Miles Morales travels across the multiverse and meets other Spider-People."
  },
  {
    id: 3,
    title: "The Batman",
    release_date: "2022-03-01",
    vote_average: 7.7,
    genre_ids: [80, 9648, 53],
    poster_path: "/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    backdrop_path: "/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg",
    overview: "Batman investigates corruption and a series of mysterious crimes in Gotham."
  },
  {
    id: 4,
    title: "Interstellar",
    release_date: "2014-11-05",
    vote_average: 8.7,
    genre_ids: [12, 18, 878],
    poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    backdrop_path: "/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    overview: "A team of explorers travels beyond this galaxy to find a future for humanity."
  },
  {
    id: 5,
    title: "Inception",
    release_date: "2010-07-15",
    vote_average: 8.4,
    genre_ids: [28, 878, 12],
    poster_path: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg",
    backdrop_path: "/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    overview: "A skilled thief enters dreams to perform an unusual kind of heist."
  },
  {
    id: 6,
    title: "The Dark Knight",
    release_date: "2008-07-16",
    vote_average: 9.0,
    genre_ids: [28, 80, 18],
    poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    backdrop_path: "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    overview: "Batman faces a criminal mastermind who throws Gotham into chaos."
  },
  {
    id: 7,
    title: "Deadpool",
    release_date: "2016-02-09",
    vote_average: 8.0,
    genre_ids: [28, 35],
    poster_path: "/zq8Cl3PNIDGU3iWNRoc5nEZ6pCe.jpg",
    backdrop_path: "/en971MEXui9diirXlogOrPKmsEn.jpg",
    overview: "A wisecracking antihero sets out to confront the man who changed his life."
  },
  {
    id: 8,
    title: "Avengers: Endgame",
    release_date: "2019-04-24",
    vote_average: 8.3,
    genre_ids: [28, 12, 878],
    poster_path: "/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg",
    backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    overview: "The Avengers attempt to reverse the devastating events of the past."
  },

  // Harry Potter
  {
    id: 9,
    title: "Harry Potter and the Philosopher's Stone",
    release_date: "2001-11-16",
    vote_average: 7.9,
    genre_ids: [12, 14],
    poster_path: "/wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",
    overview: "A young wizard discovers a magical world and begins his journey at Hogwarts."
  },
  {
    id: 10,
    title: "Harry Potter and the Chamber of Secrets",
    release_date: "2002-11-15",
    vote_average: 7.7,
    genre_ids: [12, 14],
    poster_path: "/sdEOH0992YZ0QSxgXNIGLq1ToUi.jpg",
    overview: "Harry returns to Hogwarts as mysterious events threaten the school."
  },
  {
    id: 11,
    title: "Harry Potter and the Prisoner of Azkaban",
    release_date: "2004-05-31",
    vote_average: 8.0,
    genre_ids: [12, 14],
    poster_path: "/aWxwnYoe8p2d2fcxOqtvAtJ72Rw.jpg",
    overview: "Harry learns about his past while a dangerous prisoner escapes."
  },
  {
    id: 12,
    title: "Harry Potter and the Goblet of Fire",
    release_date: "2005-11-16",
    vote_average: 7.8,
    genre_ids: [12, 14],
    poster_path: "/fECBtHlr0RB3foNHDiCBXeg9Bv9.jpg",
    overview: "Harry competes in a dangerous magical tournament."
  },

  // Series and TV shows
  {
    id: 13,
    title: "Wednesday",
    release_date: "2022-11-23",
    vote_average: 8.0,
    genre_ids: [35, 80, 14],
    poster_path: "/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    overview: "Wednesday Addams investigates strange mysteries at Nevermore Academy.",
    media_type: "tv"
  },
  {
    id: 14,
    title: "Squid Game",
    release_date: "2021-09-17",
    vote_average: 7.8,
    genre_ids: [18, 53],
    poster_path: "/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    overview: "Contestants enter deadly games for a chance to win a life-changing prize.",
    media_type: "tv"
  },
  {
    id: 15,
    title: "The Summer I Turned Pretty",
    release_date: "2022-06-17",
    vote_average: 8.0,
    genre_ids: [18, 10749],
    poster_path: "/mDqzHV8UXWWNpZkoAbKmKX1ZxEE.jpg",
    overview: "A summer romance brings friendship, family, and growing-up changes.",
    media_type: "tv"
  },
  {
    id: 16,
    title: "Stranger Things",
    release_date: "2016-07-15",
    vote_average: 8.6,
    genre_ids: [18, 878, 9648],
    poster_path: "/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
    overview: "A group of friends uncover strange secrets in their small town.",
    media_type: "tv"
  },
  {
    id: 17,
    title: "Vincenzo",
    release_date: "2021-02-20",
    vote_average: 8.5,
    genre_ids: [18, 35, 80],
    poster_path: "/g9aDZSqH5KmsHbMurhni5d2wq6N.jpg",
    overview: "A Korean-Italian lawyer takes on a powerful conglomerate.",
    media_type: "tv"
  },
  {
    id: 18,
    title: "All of Us Are Dead",
    release_date: "2022-01-28",
    vote_average: 7.6,
    genre_ids: [18, 27, 28],
    poster_path: "/pTEFqAjLd5YTsMD6NSUxV6Dq7A6.jpg",
    overview: "Students struggle to survive a zombie outbreak at their school.",
    media_type: "tv"
  },
  {
    id: 19,
    title: "The Queen's Gambit",
    release_date: "2020-10-23",
    vote_average: 8.5,
    genre_ids: [18],
    poster_path: "/zU0htwkhNvBQdVSIKB9s6hgVeFK.jpg",
    overview: "A gifted young chess player rises through the competitive chess world.",
    media_type: "tv"
  },

  // Doraemon movies
  {
    id: 20,
    title: "Doraemon: Nobita's New Dinosaur",
    release_date: "2020-08-07",
    vote_average: 7.5,
    genre_ids: [16, 12, 10751],
    poster_path: "/xV3Q8mY5zW8f8v7jJ5n6Q2u4s5A.jpg",
    overview: "Doraemon and Nobita embark on a dinosaur-filled adventure."
  },
  {
    id: 21,
    title: "Doraemon: Nobita's Treasure Island",
    release_date: "2018-03-03",
    vote_average: 7.2,
    genre_ids: [16, 12, 10751],
    poster_path: "/q8f0D9p7vJ5mK3L2nR6xW1sT4uA.jpg",
    overview: "Nobita and his friends set out on a treasure-hunting adventure."
  },
  {
    id: 22,
    title: "Doraemon: Nobita and the Sky Utopia",
    release_date: "2023-03-03",
    vote_average: 7.0,
    genre_ids: [16, 12, 10751],
    poster_path: "/8mR4XvQ9K2sN7pL5jT1wD6yF3aB.jpg",
    overview: "Doraemon and friends discover a mysterious perfect world in the sky."
  },

  // More animated and family films
  {
    id: 23,
    title: "Inside Out 2",
    release_date: "2024-06-12",
    vote_average: 7.6,
    genre_ids: [16, 10751, 35],
    poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    overview: "Riley faces new emotions as she enters her teenage years."
  },
  {
    id: 24,
    title: "Coco",
    release_date: "2017-10-27",
    vote_average: 8.4,
    genre_ids: [16, 10751, 14],
    poster_path: "/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg",
    overview: "A young musician discovers his family's extraordinary history."
  },
  {
    id: 25,
    title: "Frozen",
    release_date: "2013-11-27",
    vote_average: 7.2,
    genre_ids: [16, 10751, 14],
    poster_path: "/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg",
    overview: "Two sisters face a frozen kingdom and discover the meaning of love."
  },

  // Romance and drama
  {
    id: 26,
    title: "The Notebook",
    release_date: "2004-06-25",
    vote_average: 7.9,
    genre_ids: [18, 10749],
    poster_path: "/qom1SZSENdmHFNZBXbtJAU0WTlC.jpg",
    overview: "A lifelong love story unfolds through memories and difficult choices."
  },
  {
    id: 27,
    title: "Me Before You",
    release_date: "2016-06-01",
    vote_average: 7.9,
    genre_ids: [18, 10749],
    poster_path: "/Ia3dzj5LnCj1ZBdlVeJrbKJQxG.jpg",
    overview: "An unexpected connection changes two people's lives."
  },
  {
    id: 28,
    title: "La La Land",
    release_date: "2016-11-29",
    vote_average: 7.9,
    genre_ids: [18, 35, 10749],
    poster_path: "/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg",
    overview: "A musician and an aspiring actor pursue their dreams in Los Angeles."
  },

  // More action and adventure
  {
    id: 29,
    title: "Top Gun: Maverick",
    release_date: "2022-05-24",
    vote_average: 8.2,
    genre_ids: [28, 18],
    poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    overview: "A veteran pilot trains a new generation for a dangerous mission."
  },
  {
    id: 30,
    title: "Jurassic World",
    release_date: "2015-06-06",
    vote_average: 6.7,
    genre_ids: [28, 12, 878],
    poster_path: "/A0LZHXUzo5C60Oahvt7VxvwuzHw.jpg",
    overview: "A dinosaur theme park spirals into chaos."
  },
  {
    id: 31,
    title: "The Hunger Games",
    release_date: "2012-03-12",
    vote_average: 7.2,
    genre_ids: [28, 12, 878],
    poster_path: "/yXCbOiVDCxO71zI7cuwBRXdftq8.jpg",
    overview: "A young woman fights for survival in a televised competition."
  },
  {
    id: 32,
    title: "The Maze Runner",
    release_date: "2014-09-10",
    vote_average: 7.2,
    genre_ids: [28, 9648, 878],
    poster_path: "/ode14q7WtDugFDp78fo9lCsmay9.jpg",
    overview: "A teenager wakes up in a mysterious maze with no memory."
  }
];

// Use demo content if the live API is unavailable.
export async function getMovies(endpoint = "movie/popular") {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!apiKey) return demoMovies;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}`
    );

    if (!response.ok) throw new Error("Movie API request failed");

    const data = await response.json();
    return data.results?.length ? data.results : demoMovies;
  } catch {
    return demoMovies;
  }
}

export async function searchMovies(query) {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  if (!query?.trim()) return demoMovies;

  if (!apiKey) {
    return demoMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) throw new Error("Movie search failed");

    const data = await response.json();

    return data.results?.length
      ? data.results.filter((movie) => movie.poster_path)
      : demoMovies.filter((movie) =>
          movie.title.toLowerCase().includes(query.toLowerCase())
        );
  } catch {
    return demoMovies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}
