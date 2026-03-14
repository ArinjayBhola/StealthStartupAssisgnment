"use client";

import { useState, FormEvent } from "react";

interface AskBoxProps {
  onResults: (data: {
    productIds: number[];
    summary: string;
    products: Array<{
      id: number;
      name: string;
      category: string;
      price: number;
      description: string;
      tags: string[];
    }>;
  }) => void;
  onLoading: (loading: boolean) => void;
  onError: (error: string | null) => void;
}

export default function AskBox({ onResults, onLoading, onError }: AskBoxProps) {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    onLoading(true);
    setIsLoading(true);
    onError(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      onResults(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      onError(msg);
    } finally {
      onLoading(false);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about products, e.g. What's good for gaming?"
        disabled={isLoading}
        className="flex-1 bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-colors shadow-sm disabled:bg-gray-50 disabled:text-gray-500"
      />
      <button
        type="submit"
        className="bg-gray-900 text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm sm:w-auto w-full flex justify-center items-center"
        disabled={!query.trim() || isLoading}
      >
        {isLoading ? "Thinking..." : "Ask AI"}
      </button>
    </form>
  );
}
