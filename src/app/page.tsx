"use client";

import { useState, useEffect } from "react";
import { Product } from "@/data/products";
import AskBox from "@/components/AskBox";
import ProductGrid from "@/components/ProductGrid";

interface AskResult {
  productIds: number[];
  summary: string;
  products: Product[];
}

export default function Home() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayProducts, setDisplayProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [askLoading, setAskLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [isAskResult, setIsAskResult] = useState(false);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data: Product[]) => {
        setAllProducts(data);
        setDisplayProducts(data);
      })
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  function handleAskResults(data: AskResult) {
    setDisplayProducts(data.products);
    setSummary(data.summary);
    setIsAskResult(true);
  }

  function handleReset() {
    setDisplayProducts(allProducts);
    setSummary(null);
    setError(null);
    setIsAskResult(false);
  }

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 space-y-12">
        <header className="space-y-4 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight text-balance">
            Product Discovery
          </h1>
          <p className="text-lg text-gray-600 text-balance">
            Browse our catalog or ask AI to find what you need.
          </p>
        </header>

        <section className="max-w-xl mx-auto">
          <AskBox
            onResults={handleAskResults}
            onLoading={setAskLoading}
            onError={setError}
          />
        </section>

        {error && (
          <div className="p-4 bg-red-50/50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </div>
        )}

        {summary && (
          <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-2xl shadow-sm">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-blue-800 mb-2">
              AI Summary
            </h2>
            <p className="text-base text-blue-900 leading-relaxed">{summary}</p>
          </div>
        )}

        {isAskResult && (
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-2"
            >
              &larr; View all products
            </button>
          </div>
        )}

        {loading || askLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-pulse text-gray-400 font-medium tracking-wide">
              {askLoading ? "Analyzing request..." : "Loading catalog..."}
            </div>
          </div>
        ) : (
          <ProductGrid products={displayProducts} />
        )}
      </div>
    </main>
  );
}
