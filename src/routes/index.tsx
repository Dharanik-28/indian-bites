import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import hero from "@/assets/hero.jpg";
import { foods } from "@/lib/foods";
import { FoodGrid } from "@/components/FoodCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Foodie India — Taste the Flavours of India" },
      { name: "description", content: "Discover Biryani, Dosa, Idli, Samosa and Poori with recipes and ingredients." },
      { property: "og:title", content: "Foodie India" },
      { property: "og:description", content: "Discover classic Indian dishes, ingredients and recipes." },
    ],
  }),
  component: Home,
});

function Home() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${hero})` }}>
        <div className="hero__overlay" />
        <div className="hero__content">
          <span className="pill">🇮🇳 Authentic Indian Flavours</span>
          <h1>Taste the soul of <span className="txt-orange">India</span>, one <span className="txt-green">dish</span> at a time.</h1>
          <p>From fragrant biryani to crispy dosa — explore classic recipes and their ingredients.</p>
          <form className="search" onSubmit={(e) => { e.preventDefault(); navigate({ to: "/foods", search: { q } }); }}>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search Biryani, Dosa, potatoes..." aria-label="Search food" />
            <button className="btn btn--primary" type="submit">Search</button>
          </form>
          <Link to="/scan" className="btn btn--ghost">📷 Find a recipe from a photo</Link>
        </div>
      </section>
      <section className="section">
        <div className="section__head">
          <h2>Popular Dishes</h2>
          <Link to="/foods" search={{ q: "" }} className="link">See all →</Link>
        </div>
        <FoodGrid items={foods} />
      </section>
    </>
  );
}
