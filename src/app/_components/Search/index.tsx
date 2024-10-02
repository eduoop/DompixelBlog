import React from "react";
import SearchInput from "../SearchInput";

function Search() {
  return (
    <aside className="w-80 bg-gray-800 border-l border-gray-700 p-4 h-full flex flex-col">
      <div className="mb-4">
        <SearchInput />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Descubra</h2>
        <p>Explore novos artigos e fique por dentro das últimas publicações.</p>
      </div>
    </aside>
  );
}

export default Search;
