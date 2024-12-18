'use client'
import { useState } from "react";
import Modal from "./Modal";
import ProductCard from "./ProductCard";
import { Product } from "@/types/product";
interface ProductGridProps {
  products: Product[];
  filteredProducts: Product[];
}

export default function ProductGrid({ filteredProducts, products }: ProductGridProps) {
  const [modal, setModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-8">
      {filteredProducts !== null ? filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product}  setModal={setModal} setSelectedProduct={setSelectedProduct} />
      )) :
        products.map((product) => (
          <ProductCard key={product.id} product={product} setModal={setModal} setSelectedProduct={setSelectedProduct} />
        ))}
      {modal && selectedProduct &&
        <Modal product={selectedProduct} onClose={() => setModal(false)} />
      }
    </div>
  );
}
