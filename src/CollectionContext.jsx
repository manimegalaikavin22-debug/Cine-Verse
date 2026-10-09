
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CollectionContext = createContext(null);

const STORAGE_KEYS = {
  favorites: "cineverse-favorites",
  watchlist: "cineverse-watchlist",
  watched: "cineverse-watched",
};

function readCollection(key) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function CollectionProvider({ children }) {
  const [favorites, setFavorites] = useState(() =>
    readCollection(STORAGE_KEYS.favorites)
  );
  const [watchlist, setWatchlist] = useState(() =>
    readCollection(STORAGE_KEYS.watchlist)
  );
  const [watched, setWatched] = useState(() =>
    readCollection(STORAGE_KEYS.watched)
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.favorites,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.watchlist,
      JSON.stringify(watchlist)
    );
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEYS.watched,
      JSON.stringify(watched)
    );
  }, [watched]);

  function toggleItem(list, setList, movie) {
    setList((current) =>
      current.some((item) => item.id === movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [movie, ...current]
    );
  }

  const value = {
    favorites,
    watchlist,
    watched,

    isFavorite: (id) =>
      favorites.some((movie) => movie.id === id),

    isInWatchlist: (id) =>
      watchlist.some((movie) => movie.id === id),

    isWatched: (id) =>
      watched.some((movie) => movie.id === id),

    toggleFavorite: (movie) =>
      toggleItem(favorites, setFavorites, movie),

    toggleWatchlist: (movie) =>
      toggleItem(watchlist, setWatchlist, movie),

    toggleWatched: (movie) =>
      toggleItem(watched, setWatched, movie),
  };

  return (
    <CollectionContext.Provider value={value}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);

  if (!context) {
    throw new Error(
      "useCollection must be used inside CollectionProvider"
    );
  }

  return context;
}
