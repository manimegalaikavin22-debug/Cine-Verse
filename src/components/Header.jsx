
import { useState } from "react";
import { Clapperboard, Search, Heart, Film } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/discover?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <span className="brand-mark">
            <Clapperboard size={21} />
          </span>
          <span>CINEVERSE</span>
        </NavLink>

        <nav className="main-nav">
          <NavLink to="/" end>
            <Film size={15} /> Film
          </NavLink>
          <NavLink to="/discover?q=series">
            Series
          </NavLink>
          <NavLink to="/favorites">
            <Heart size={15} /> My List
          </NavLink>
        </nav>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            aria-label="Search movies"
          />
          <button type="submit" aria-label="Search">
            <Search size={17} />
          </button>
        </form>
      </div>
    </header>
  );
}
