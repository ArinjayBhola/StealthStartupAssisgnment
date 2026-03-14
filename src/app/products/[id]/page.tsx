import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} | Product Discovery`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-20">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8 sm:mb-12"
        >
          &larr; <span className="ml-2">Back to catalog</span>
        </Link>

        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-12 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                {product.name}
              </h1>
              <p className="text-base font-semibold text-blue-600 uppercase tracking-widest">
                {product.category}
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100">
              <span className="text-3xl font-black text-gray-900">
                ₹{product.price}
              </span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-gray-600 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          <div className="pt-8 border-t border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium bg-gray-100 text-gray-700 px-4 py-2 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
