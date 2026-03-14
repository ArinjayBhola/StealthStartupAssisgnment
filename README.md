# Product Discovery with AI Assist

A mini product discovery app built with **Next.js** (App Router), **TypeScript**, **Tailwind CSS**, and **Google Gemini** for AI-powered natural language search.

## What's Implemented

- **GET /api/products** - Returns the full product catalog. Supports optional `?category=` and `?q=` query params for filtering.
- **POST /api/ask** - Accepts `{ "query": "..." }`, sends the query + full product catalog to Google Gemini, and returns `{ productIds, summary, products }` with matching products and an AI-generated summary.
- **Product list page** (`/`) - Displays all products as cards. Includes an "Ask AI" search box that calls the ask endpoint and shows filtered results with an AI summary.
- **Product detail page** (`/products/[id]`) - Dynamic route showing full product details with SEO metadata.
- **Error handling** - Missing API key returns 503; LLM failures return 502 with a safe message; frontend shows error states.

### LLM Integration

- Uses **Google Gemini 2.5 Flash** via the `@google/generative-ai` SDK.
- The prompt includes the full product catalog and instructs the model to return structured JSON (`productIds` + `summary`).
- Response is parsed with a fallback JSON extractor in case the model wraps output in markdown code fences.

## How to Run

### Prerequisites

- Node.js 18+ and npm

### Setup

1. Clone the repository:

   ```bash
   git clone <repo-url>
   cd stealthstartup
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with your Gemini API key:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and replace `your_gemini_api_key_here` with your actual key from [Google AI Studio](https://aistudio.google.com/apikey).

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    api/
      products/route.ts   # GET /api/products
      ask/route.ts         # POST /api/ask (Gemini integration)
    products/[id]/page.tsx # Product detail page
    page.tsx               # Main page (product list + ask UI)
    layout.tsx             # Root layout with SEO metadata
  components/
    ProductCard.tsx        # Reusable product card component
    ProductGrid.tsx        # Grid layout for product cards
    AskBox.tsx             # Search/ask form component
  data/
    products.ts            # Mock product catalog (8 products)
```

## Environment Variables

| Variable         | Required | Description                                                      |
| ---------------- | -------- | ---------------------------------------------------------------- |
| `GEMINI_API_KEY` | Yes      | Google Gemini API key (server-side only, never exposed to client) |

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **LLM**: Google Gemini 2.5 Flash
- **Data**: In-memory mock catalog (no database)
