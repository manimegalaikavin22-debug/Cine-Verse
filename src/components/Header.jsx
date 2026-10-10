import { Clapperboard } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Clapperboard size={22} />
          </span>
          <span>CINEVERSE</span>
        </Link>
      </div>
    </header>
  );
}