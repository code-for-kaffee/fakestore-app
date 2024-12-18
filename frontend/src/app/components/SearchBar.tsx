export default function SearchBar({ onSearch }: { onSearch: (search: string) => void }) {
    return (
        <div className="w-full max-w-lg mx-auto my-4">
            <input
                type="text"
                placeholder="Search products"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
}
