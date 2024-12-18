import Link from "next/link";
import { useCartStore } from "../store/cartStore";


export default function Navbar() {
    const cart = useCartStore((state) => state.cart);
    return (
        <div className="flex justify-between items-center px-4 py-2 bg-white border-b border-gray-200">
            <div className="text-lg font-bold">Mana FakeStore</div>
            <ul className="flex space-x-6">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/cart">Cart</Link></li>
            </ul>
            <div className="font-semibold">
                <Link href="/cart">Cart🛒({cart.reduce((total, item) => total + (item.quantity ?? 1), 0)}) </Link>
            
            </div>
        </div>
    );
}
