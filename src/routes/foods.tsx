import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { searchFoods } from "@/lib/foods";
import { FoodGrid } from "@/components/FoodCard";

export const Route = createFileRoute("/foods")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  head: () => ({
    meta: [
      { title: "Foods — Foodie India" },
      { name: "description", content: "Search Indian dishes by name, region or ingredient." },
      { property: "og:title", content: "Foods — Foodie India" },
      { property: "og:description", content: "Search Indian dishes by name, region or ingredient." },
    ],
  }),
  component: Foods,
});

function Foods() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/foods" });
  const results = searchFoods(q);
  return (
    <section className="section page">
      <h1 className="page__title">Our <span className="txt-orange">Foods</span></h1>
      <div className="search search--light">
        <input
          autoFocus
          value={q}
          onChange={(e) => navigate({ search: { q: e.target.value }, replace: true })}
          placeholder="Search by name, region or ingredient..."
          aria-label="Search food"
        />
      </div>
      <p className="muted">{results.length} dish{results.length === 1 ? "" : "es"} found</p>
      <FoodGrid items={results} />
    </section>
  );
}
