import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`http://localhost:7000/api/foods/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Search error:", err);
          setLoading(false);
        });
    }
  }, [query]);

  if (loading) return <div className="text-center p-10">Searching products...</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto text-slate-800">
      <h1 className="text-2xl font-bold mb-6">Search Results for: "{query}"</h1>

      {results.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No products found matching your search.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {results.map((product) => (
            <div key={product._id} className="border rounded-xl p-4 shadow-sm bg-white flex flex-col justify-between">
              <div>
                <img src={product.image || "https://placehold.co/300"} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-3" />
                {/* FIXED: Using product.name instead of product.foodName */}
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-bold text-green-600">${product.price}</span>
                <Link to={`/product/${product._id}`} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;