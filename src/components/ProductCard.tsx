"use client";

import Link from "next/link";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-2xl p-6 transition-colors duration-300 border border-gray-100"
    >
      <div className="flex justify-between items-start gap-4 mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider">
            {product.category}
          </p>
        </div>
        <span className="text-xl font-black text-gray-900 whitespace-nowrap">
          ₹{product.price}
        </span>
      </div>
      
      <p className="text-base text-gray-600 mb-6 line-clamp-2 leading-relaxed">
        {product.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mt-auto">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-100"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
