'use client'
import { Product } from "@/types/product";
import { useCartStore } from "../store/cartStore";
import Navbar from "../components/Navbar";


const Cart = () => {

    const { cart, removeFromCart } = useCartStore();
    console.log(cart.length)
    if(cart.length === 0) {
        return (
            <div >
                <Navbar />
                <div className='flex justify-center'>
                <h1>Your cart is empty</h1>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            <div className='flex flex-col'>
                {cart.map((product: Product) => (
                    <div key={product.id} className="flex flex-row justify-between">
                        <div className="flex flex-row">
                        <img src={product.image} alt={product.title} className="w-20 h-20" />
                        <h3>{product.title}</h3>
                        </div>
                        <div>
                        <h3>{product.quantity}</h3>
                        <h3>${product.price}</h3>

                        <button onClick={() => {
                            removeFromCart(product.id);
                        }}>Remove</button>
                        </div>
                       
                    </div>
                ))}
                <div>
                    <h3>Total: ${cart.reduce((acc, product) => acc + product.price, 0).toFixed(2)}</h3>
                </div>
            </div>

        </div>
    )
}

export default Cart;