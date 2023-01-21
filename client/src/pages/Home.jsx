import React, { useState } from "react";
import { Card, FormField, Loader } from "../components";

function RenderCards({ data, title }) {
  if (data.length > 0) {
    return (
      <>
        {data.map((item) => (
          <Card key={item._id} {...item} />
        ))}
      </>
    );
  }
}

function Home() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = (e) => {};

  return (
    <div>
      <div>
        <h1 className="font-medium text-[#666e75] text-xl mb-3">Showcase</h1>
        <p className="mt-2">All these masterpieces created by Dall-E</p>
      </div>

      <div className="mt-16">
        <FormField
          name="search"
          label="Search"
          type="text"
          placeholder="Search here .."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2>
                Showing results for <span>{searchText}</span>
              </h2>
            )}
            <div className="grid">
              {searchText ? (
                <RenderCards data={searchResults} title="No results found"/>
              ) : (
                <RenderCards data={allPosts} title="No posts yet" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
