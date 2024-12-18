import { Product } from "@/types/product";
import Button from "./Button";
import { useCartStore } from "../store/cartStore";
interface ProductCardProps {
  product: Product;
  setSelectedProduct?: (product: Product) => void;
  setModal: (modal: boolean) => void;
}

export default function ProductCard({ product, setSelectedProduct, setModal }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);


  const addSelectedProduct = () => {
    if (setSelectedProduct) {
      setModal(true)
      setSelectedProduct(product);
    }
  }
  if (product === null) return (
    <div>
      <p>Product not found</p>
    </div>
  );
  return (
    <div className="flex flex-col justify-center items-center border border-gray-200 p-4 rounded-md text-center shadow-sm">
      <img src={product.image} alt={product.title} className="w-48 h-48 mb-4" onClick={() => addSelectedProduct()} />
      <h3 className="text-lg font-semibold">${product.price}</h3>
      <p className="text-gray-600 text-sm mt-1 mb-3">{product.title}</p>
      <div className="flex flex-row justify-between">
        <Button onClick={addSelectedProduct}>+ More</Button>
        <Button onClick={() => addToCart(product)} className={`${product.stock === 0 ? 'disabled bg-red-50 line-through' : ''}`}
        >Add to cart</Button>
      </div>

    </div>
  );
}
