
import { useCollection } from "../CollectionContext";
import { Heart } from "lucide-react";
import MovieGrid from "../components/MovieGrid";

export default function Favorites({ onOpen }) {
  const { favorites = [] } = useCollection();

  return (
    <main className="library-page">
      <section className="page-banner collection-banner">
        <div className="page-banner-icon">
          <Heart size={27} />
        </div>
        <span className="eyebrow">THE MOVIES YOU LOVE</span>
        <h1>
          Your <span className="accent">Favorites.</span>
        </h1>
        <p>Keep your favourite stories all in one place.</p>
      </section>

      <div className="library-heading">
        <div>
          <h2>Favorite collection</h2>
          <p>Films you have marked with a heart.</p>
        </div>
        <span className="library-count">
          {favorites.length} films
        </span>
      </div>

      <MovieGrid
        movies={favorites}
        onOpen={onOpen}
        loading={false}
        emptyTitle="Your favorites start here"
        emptyText="Open a movie and tap the heart to add it to this collection."
      />
    </main>
  );
}
