import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Register — Foodie India" },
      { name: "description", content: "Create your Foodie India account." },
      { property: "og:title", content: "Register — Foodie India" },
      { property: "og:description", content: "Create your Foodie India account." },
    ],
  }),
  component: Login,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

function Login() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(form);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(r.data.name);
    setForm({ name: "", email: "", password: "" });
  };

  return (
    <section className="section page">
      <div className="auth-card">
        <h1>Join <span className="txt-orange">Foodie</span> <span className="txt-green">India</span></h1>
        <p className="muted">Create an account to save your favourite dishes.</p>
        {done && <div className="success">Welcome, {done}! Your registration was successful.</div>}
        <form onSubmit={submit} noValidate>
          {(["name", "email", "password"] as const).map((k) => (
            <label key={k}>
              {k.charAt(0).toUpperCase() + k.slice(1)}
              <input
                type={k === "name" ? "text" : k}
                value={form[k]}
                onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                placeholder={k === "email" ? "you@example.com" : k === "name" ? "Your name" : "••••••"}
              />
              {errors[k] && <small className="error">{errors[k]}</small>}
            </label>
          ))}
          <button className="btn btn--primary btn--block" type="submit">Register</button>
        </form>
      </div>
    </section>
  );
}
