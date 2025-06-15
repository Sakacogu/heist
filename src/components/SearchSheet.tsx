"use client";

import Fuse from "fuse.js";
import { X, Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

interface Product {
  _id: string;
  title: string;
  brand: string;
  functions: string[];
  slug: { current: string };
  priceISK: number;
}

export default function SearchSheet({ onClose }: { onClose: () => void }) {
  // Full-text index – set once when data arrives
  const [searchIndex, setSearchIndex] = useState<Fuse<Product>>();
  // Current input value
  const [query, setQuery] = useState("");
  // Top N matches (derived from query)
  const [matches, setMatches] = useState<Product[]>([]);
  // Grab focus when component mounts
  const inputRef = useRef<HTMLInputElement>(null);

  // fetch products → build fuzzy index
  useEffect(() => {
    fetch("/api/products")
      .then((response) => response.json())
      .then((products: Product[]) =>
        setSearchIndex(
          new Fuse(products, {
            threshold: 0.35,
            keys: [
              { name: "title", weight: 0.5 },
              { name: "brand", weight: 0.3 },
              { name: "functions", weight: 0.2 },
            ],
          }),
        ),
      );

    const focusTimer = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(focusTimer);
  }, []);

  // update result list whenever query or index changes
  useEffect(() => {
    if (!query.trim() || !searchIndex) {
      setMatches([]);
      return;
    }
    const topHits = searchIndex
      .search(query)
      .slice(0, 8)
      .map((match) => match.item);
    setMatches(topHits);
  }, [query, searchIndex]);

  return (
    <div className="fixed inset-0 z-60 flex flex-col bg-black/50 backdrop-blur-sm">
      <div className="mx-auto w-full max-w-xl rounded-b-xl bg-white shadow-xl">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <Search className="h-5 w-5 text-gray-500" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Leitaðu að vöru, tegund eða eiginleika…"
            className="flex-1 text-[17px] text-gray-900 placeholder-gray-400 outline-none"
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {query && (
          <ul className="max-h-[64vh] overflow-auto divide-y">
            {matches.length === 0 && (
              <li className="p-6 text-center text-gray-600">
                Engar niðurstöður 😕
              </li>
            )}

            {matches.map((product) => (
              <li key={product._id}>
                <Link
                  href={`/products/${product.slug.current}`}
                  onClick={onClose}
                  className="block px-6 py-4 transition hover:bg-gray-50"
                >
                  <p className="font-medium text-gray-700">{product.title}</p>
                  <p className="mt-0.5 text-sm text-gray-600">
                    {product.brand}
                    {product.functions?.length
                      ? ` · ${product.functions.join(", ")}`
                      : ""}
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
