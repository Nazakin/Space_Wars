import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (query && query !== "") {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://sw-api.starnavi.io/people/?search=${query}`
          );
          setResults(res.data.results);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setResults([]);
        }
      };
      fetchData();
    } else {
      setResults([]);
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleBlur = () => {
    if (query === "") {
      setResults([]);
    }
  };

  return (
    <div className="relative flex items-center flex-col">
      <form
        onSubmit={handleSearch}
        className="flex items-center border-b border-b-2 border-teal-500 py-2 w-full"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={handleBlur}
          placeholder="Search..."
          className="appearance-none bg-transparent border-none w-full text-white py-1 px-2 leading-tight focus:outline-none"
        />
      </form>
      {results.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-md shadow-md z-10">
          {results.map((result, index) => (
            <li
              key={index}
              className="p-2 border-b border-gray-200 last:border-b-0 cursor-pointer hover:bg-gray-200"
              onClick={(e) => router.push(`people/${result.id}`)}
            >
              {result.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
