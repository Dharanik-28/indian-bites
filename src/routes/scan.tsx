import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { findFoodByLabel, type Food } from "@/lib/foods";
import { FoodModal } from "@/components/FoodCard";

export const Route = createFileRoute("/scan")({
  head: () => ({
    meta: [
      { title: "Recipe Scanner — Foodie India" },
      { name: "description", content: "Upload a food photo and find its recipe using a Teachable Machine model." },
      { property: "og:title", content: "Recipe Scanner — Foodie India" },
      { property: "og:description", content: "Find recipes from food photos with Teachable Machine." },
    ],
  }),
  component: Scan,
});

type Pred = { className: string; probability: number };
declare global {
  interface Window { tmImage?: any; tf?: any }
}

function loadScript(src: string) {
  return new Promise<void>((res, rej) => {
    if (document.querySelector(`script[src="${src}"]`)) return res();
    const s = document.createElement("script");
    s.src = src; s.onload = () => res(); s.onerror = () => rej(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

function Scan() {
  const [url, setUrl] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [preds, setPreds] = useState<Pred[]>([]);
  const [status, setStatus] = useState("");
  const [match, setMatch] = useState<Food | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const modelRef = useRef<{ url: string; model: any } | null>(null);

  const run = async () => {
    if (!img || !imgRef.current) return setStatus("Please upload a food photo first.");
    let base = url.trim();
    if (!/^https:\/\/teachablemachine\.withgoogle\.com\/models\/[\w-]+\/?$/.test(base))
      return setStatus("Paste a valid Teachable Machine model link (https://teachablemachine.withgoogle.com/models/...).");
    if (!base.endsWith("/")) base += "/";
    try {
      setStatus("Loading model…");
      await loadScript("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js");
      await loadScript("https://cdn.jsdelivr.net/npm/@teachablemachine/image@0.8/dist/teachablemachine-image.min.js");
      if (modelRef.current?.url !== base) {
        const model = await window.tmImage.load(base + "model.json", base + "metadata.json");
        modelRef.current = { url: base, model };
      }
      setStatus("Analysing photo…");
      const p: Pred[] = await modelRef.current!.model.predict(imgRef.current);
      p.sort((a, b) => b.probability - a.probability);
      setPreds(p);
      const top = p[0]?.className ?? "";
      const food = findFoodByLabel(top);
      setStatus(food ? `Looks like ${food.name}!` : `Detected “${top}” — no recipe in our list yet.`);
      if (food) setMatch(food);
    } catch (e) {
      setStatus("Couldn't run the model. Check the link and try again.");
    }
  };

  return (
    <section className="section page narrow">
      <h1 className="page__title">📷 Recipe <span className="txt-orange">Scanner</span></h1>
      <p className="muted">
        Powered by Google Teachable Machine. Train an image model with classes named
        Biryani, Dosa, Idli, Samosa and Poori, export it (“Upload my model”) and paste the link below.
      </p>
      <div className="scan">
        <label>
          Teachable Machine model link
          <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://teachablemachine.withgoogle.com/models/XXXX/" />
        </label>
        <label className="upload">
          <input type="file" accept="image/*" onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) { setImg(URL.createObjectURL(f)); setPreds([]); setStatus(""); }
          }} />
          {img ? <img ref={imgRef} src={img} alt="Uploaded food" crossOrigin="anonymous" /> : <span>Click to upload a food photo</span>}
        </label>
        <button className="btn btn--primary btn--block" onClick={run}>Find Recipe</button>
        {status && <p className="status">{status}</p>}
        {preds.length > 0 && (
          <ul className="preds">
            {preds.map((p) => (
              <li key={p.className}>
                <span>{p.className}</span>
                <div className="bar"><div style={{ width: `${(p.probability * 100).toFixed(0)}%` }} /></div>
                <b>{(p.probability * 100).toFixed(0)}%</b>
              </li>
            ))}
          </ul>
        )}
      </div>
      {match && <FoodModal food={match} onClose={() => setMatch(null)} />}
    </section>
  );
}
