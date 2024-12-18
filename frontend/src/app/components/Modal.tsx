import { Product } from "@/types/product";
import Button from "./Button";
import { useCartStore } from "../store/cartStore";

interface ModalProps {
    onClose: () => void;
    product: Product;
}

const Modal = ({ product, onClose }: ModalProps) => {
    const addToCart = useCartStore((state) => state.addToCart);

    const addProductToCart = () => {
        if (product.stock === 0) {
            return;
        }
        addToCart(product);
    }
    return (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <img src={product.image} alt={product.title} className="w-48 h-full mb-4" />
                                {product.description}
                                <h3>${product.price}</h3>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <Button onClick={() => { onClose(); }}>Close</Button>
                                <Button onClick={() => { addProductToCart() }} className={`${product.stock === 0 ? 'disabled bg-red-600' : ''}`}
                                >Add to cart</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal