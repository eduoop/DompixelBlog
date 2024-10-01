import React from "react";

function Search() {
  return (
    <aside className="w-80 bg-gray-800 border-l border-gray-700 p-4 h-full">
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Search..."
        />
      </div>
      <div>
        <h2 className="text-xl font-bold mb-2">Discover</h2>
        <p>Some content in the search tab...</p>
      </div>
    </aside>
  );
}

export default Search;
