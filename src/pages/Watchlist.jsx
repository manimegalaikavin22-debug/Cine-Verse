
import { useCollection } from "../CollectionContext";
import { Bookmark } from "lucide-react";
import MovieGrid from "../components/MovieGrid";

export default function Watchlist({ onOpen }) {
  const { watchlist = [] } = useCollection();

  return (
    <main className="library-page">
      <section className="page-banner collection-banner">
        <div className="page-banner-icon">
          <Bookmark size={27} />
        </div>
        <span className="eyebrow">SAVE IT FOR MOVIE NIGHT</span>
        <h1>
          My <span className="accent">Watchlist.</span>
        </h1>
        <p>All the movies you plan to watch next.</p>
      </section>

      <div className="library-heading">
        <div>
          <h2>Saved for later</h2>
          <p>Your personal watch-next collection.</p>
        </div>
        <span className="library-count">
          {watchlist.length} films
        </span>
      </div>

      <MovieGrid
        movies={watchlist}
        onOpen={onOpen}
        loading={false}
        emptyTitle="Your watchlist is empty"
        emptyText="Tap the bookmark icon on any movie to save it for later."
      />
    </main>
  );
}
