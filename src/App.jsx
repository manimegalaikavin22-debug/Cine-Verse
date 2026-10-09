
import { useCallback, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MovieModal from "./components/MovieModal";

import Discover from "./pages/Discover";
import Trending from "./pages/Trending";
import Favorites from "./pages/Favorites";
import Watchlist from "./pages/Watchlist";
import Watched from "./pages/Watched";

import { CollectionProvider } from "./CollectionContext";
import "./App.css";

function AppContent() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const location = useLocation();

  const query =
    new URLSearchParams(location.search).get("q") || "";

  const openMovie = useCallback((movie) => {
    setSelectedMovie(movie);
  }, []);

  const closeMovie = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  return (
    <>
      <Header />

      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Discover query="" onOpen={openMovie} />}
        />

        <Route
          path="/discover"
          element={<Discover query={query} onOpen={openMovie} />}
        />

        <Route
          path="/trending"
          element={<Trending onOpen={openMovie} />}
        />

        <Route
          path="/favorites"
          element={<Favorites onOpen={openMovie} />}
        />

        <Route
          path="/watchlist"
          element={<Watchlist onOpen={openMovie} />}
        />

        <Route
          path="/watched"
          element={<Watched onOpen={openMovie} />}
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>

      <MovieModal
        movie={selectedMovie}
        onClose={closeMovie}
      />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CollectionProvider>
        <AppContent />
      </CollectionProvider>
    </BrowserRouter>
  );
}
