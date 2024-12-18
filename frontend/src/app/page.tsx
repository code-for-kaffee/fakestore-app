"use client"
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import { Product } from "@/types/product";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <main>
        <SearchBar onSearch={setSearchQuery} />
        <ProductGrid products={products} filteredProducts={filteredProducts} />
      </main>
    </div>
  );
}
