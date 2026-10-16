import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/", label: "Home" },
  { to: "/foods", label: "Foods" },
  { to: "/scan", label: "Recipe Scanner" },
  { to: "/about", label: "About" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand__dot" /> Foodie <b>India</b>
        </Link>
        <button className="nav__toggle" aria-label="Menu" onClick={() => setOpen(!open)}>☰</button>
        <nav className={open ? "nav__links open" : "nav__links"}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }} activeProps={{ className: "active" }} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link to="/login" className="btn btn--primary" onClick={() => setOpen(false)}>Login</Link>
        </nav>
      </div>
    </header>
  );
}
