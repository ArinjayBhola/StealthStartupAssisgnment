export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "ProBook Lite 14",
    category: "Laptops",
    price: 499,
    description:
      "A budget-friendly 14-inch laptop with an Intel i5 processor, 8 GB RAM, and 256 GB SSD. Great for everyday productivity and web browsing.",
    tags: ["budget", "lightweight", "productivity"],
  },
  {
    id: 2,
    name: "GamerForce RTX 16",
    category: "Laptops",
    price: 1899,
    description:
      "High-performance 16-inch gaming laptop with an RTX 4070 GPU, Intel i9 processor, 32 GB RAM, and 1 TB SSD. 165 Hz display for smooth gameplay.",
    tags: ["gaming", "high-performance", "RTX"],
  },
  {
    id: 3,
    name: "UltraSlim Air 13",
    category: "Laptops",
    price: 1249,
    description:
      "Ultra-thin 13-inch laptop weighing just 1 kg. M2 chip, 16 GB RAM, 512 GB SSD, and 18-hour battery life. Perfect for professionals on the go.",
    tags: ["ultrabook", "lightweight", "premium", "long-battery"],
  },
  {
    id: 4,
    name: "CreatorStation 15 OLED",
    category: "Laptops",
    price: 1599,
    description:
      "15.6-inch OLED display with 100% DCI-P3 color accuracy. Intel i7, 32 GB RAM, 1 TB SSD, and NVIDIA RTX 4060. Ideal for video editing and design.",
    tags: ["creative", "OLED", "design", "video-editing"],
  },
  {
    id: 5,
    name: "QuietType Mechanical Keyboard",
    category: "Accessories",
    price: 89,
    description:
      "Low-profile mechanical keyboard with silent switches, RGB backlighting, and USB-C connectivity. Works with Mac and Windows.",
    tags: ["keyboard", "mechanical", "silent", "ergonomic"],
  },
  {
    id: 6,
    name: "ErgoGrip Wireless Mouse",
    category: "Accessories",
    price: 59,
    description:
      "Ergonomic vertical wireless mouse with adjustable DPI up to 4000. Reduces wrist strain during long work sessions.",
    tags: ["mouse", "ergonomic", "wireless"],
  },
  {
    id: 7,
    name: "ClearView 27 4K Monitor",
    category: "Monitors",
    price: 449,
    description:
      "27-inch 4K IPS monitor with 99% sRGB coverage, USB-C with 65 W power delivery, and adjustable stand. Great for productivity and light creative work.",
    tags: ["monitor", "4K", "USB-C", "productivity"],
  },
  {
    id: 8,
    name: "StudioPods Pro ANC",
    category: "Audio",
    price: 199,
    description:
      "Premium wireless earbuds with active noise cancellation, spatial audio, and 30-hour total battery life. IPX4 water resistant.",
    tags: ["earbuds", "ANC", "wireless", "premium"],
  },
  {
    id: 9,
    name: "EchoHub Smart Display",
    category: "Smart Home",
    price: 129,
    description:
      "8-inch smart display with voice assistant integration. Control your smart home devices, view security cameras, and make video calls.",
    tags: ["smart-home", "assistant", "display", "hub"],
  },
  {
    id: 10,
    name: "FitTracker Pro Series 3",
    category: "Wearables",
    price: 249,
    description:
      "Advanced fitness tracker with heart rate monitoring, blood oxygen sensor, GPS, and up to 14 days of battery life.",
    tags: ["fitness", "wearable", "health", "smartwatch"],
  },
  {
    id: 11,
    name: "MeshLink Wi-Fi 6 System",
    category: "Networking",
    price: 349,
    description:
      "Whole-home mesh Wi-Fi 6 system covering up to 5000 sq. ft. Supports over 100 connected devices with gigabit speeds.",
    tags: ["networking", "wi-fi", "mesh", "router"],
  },
  {
    id: 12,
    name: "VisionPad 11.5",
    category: "Tablets",
    price: 649,
    description:
      "11.5-inch high-resolution tablet with quad speakers and stylus support. Perfect for media consumption, light work, and digital art.",
    tags: ["tablet", "entertainment", "creative", "stylus"],
  },
];
