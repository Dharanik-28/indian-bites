import { useEffect, useState } from "react";
import type { Food } from "@/lib/foods";

export function FoodGrid({ items }: { items: Food[] }) {
  const [open, setOpen] = useState<Food | null>(null);
  if (items.length === 0)
    return <p className="empty">No dishes match your search. Try “rice” or “dosa”.</p>;
  return (
    <>
      <div className="food-grid">
        {items.map((f) => (
          <button key={f.id} className="food-card" onClick={() => setOpen(f)}>
            <div className="food-card__img">
              <img src={f.image} alt={f.name} loading="lazy" width={1024} height={1024} />
            </div>
            <div className="food-card__body">
              <span className="tag">{f.region}</span>
              <h3>{f.name}</h3>
              <p>{f.description}</p>
              <span className="link">View details →</span>
            </div>
          </button>
        ))}
      </div>
      {open && <FoodModal food={open} onClose={() => setOpen(null)} />}
    </>
  );
}

export function FoodModal({ food, onClose }: { food: Food; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-label={food.name} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close">×</button>
        <img src={food.image} alt={food.name} />
        <div className="modal__body">
          <span className="tag">{food.region}</span>
          <h2>{food.name}</h2>
          <p>{food.description}</p>
          <h4>Ingredients</h4>
          <ul className="chips">
            {food.ingredients.map((i) => <li key={i}>{i}</li>)}
          </ul>
          <h4>Recipe</h4>
          <ol className="steps">
            {food.recipe.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
