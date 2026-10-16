import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Foodie India" },
      { name: "description", content: "Foodie India celebrates the diverse cuisine of India." },
      { property: "og:title", content: "About — Foodie India" },
      { property: "og:description", content: "Celebrating the diverse cuisine of India." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <section className="section page narrow">
      <h1 className="page__title">About <span className="txt-orange">Foodie</span> <span className="txt-green">India</span></h1>
      <p>Foodie India celebrates the incredible variety of Indian cuisine — from the royal kitchens of Hyderabad to the street stalls of Delhi and the breakfast tables of Chennai.</p>
      <div className="features">
        <div className="feature"><span>🍛</span><h3>Classic Dishes</h3><p>Handpicked favourites loved across the country.</p></div>
        <div className="feature"><span>🧂</span><h3>Real Ingredients</h3><p>Know exactly what goes into every dish.</p></div>
        <div className="feature"><span>📷</span><h3>Photo Recipes</h3><p>Snap a dish and get its recipe with AI.</p></div>
      </div>
    </section>
  );
}
