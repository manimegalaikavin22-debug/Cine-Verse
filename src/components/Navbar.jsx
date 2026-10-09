
import { NavLink } from "react-router-dom";
import {
  Clapperboard,
  Flame,
  Heart,
  Bookmark,
  CheckCircle,
} from "lucide-react";

export default function Navbar() {
  const links = [
    { to: "/", label: "Discover", icon: Clapperboard, end: true },
    { to: "/trending", label: "Trending", icon: Flame },
    { to: "/favorites", label: "Favorites", icon: Heart },
    { to: "/watchlist", label: "My List", icon: Bookmark },
    { to: "/watched", label: "Watched", icon: CheckCircle },
  ];

  return (
    <nav className="main-navigation">
      <div className="navigation-inner">
        <span className="navigation-label">YOUR CINEMA</span>

        <div className="navigation-links">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `navigation-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={16} />
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
