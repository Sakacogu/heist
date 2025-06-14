"use client";
import Fuse from "fuse.js";
import { X, Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

type Product = {
  _id: string;
  title: string;
  brand: string;
  functions: string[];
  slug: { current: string };
  priceISK: number;
};

export default function SearchSheet({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [fuse, setFuse] = useState<Fuse<Product>>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((r) => r.json())
      .then((data: Product[]) => {
        setFuse(
          new Fuse(data, {
            keys: [
              { name: "title", weight: 0.5 },
              { name: "brand", weight: 0.3 },
              { name: "functions", weight: 0.2 },
            ],
            threshold: 0.35,
          }),
        );
      });
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!fuse || !query.trim()) return setResults([]);
    setResults(
      fuse
        .search(query)
        .map((r) => r.item)
        .slice(0, 8),
    );
  }, [query, fuse]);

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex flex-col">
      <div className="mx-auto w-full max-w-xl bg-white rounded-b-xl shadow-xl">
        <div className="flex items-center gap-2 px-4 py-3 border-b">
          <Search className="w-5 h-5 text-gray-500 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Leitaðu að vöru, tegund eða eiginleika…"
            className="flex-1 outline-none text-[17px] text-gray-900 placeholder:text-gray-400"
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {query && (
          <ul className="max-h-[64vh] overflow-auto divide-y">
            {results.length === 0 && (
              <li className="p-6 text-center text-gray-600">
                Engar niðurstöður 😕
              </li>
            )}

            {results.map((p) => (
              <li key={p._id}>
                <Link
                  href={`/products/${p.slug.current}`}
                  onClick={onClose}
                  className="block px-6 py-4 hover:bg-gray-50 transition"
                >
                  <p className="font-medium text-gray-700">{p.title}</p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {p.brand} ·{" "}
                    {p.functions?.length ? ` · ${p.functions.join(", ")}` : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
