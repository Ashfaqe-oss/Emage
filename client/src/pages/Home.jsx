import React, { useState, useEffect } from "react";
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

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
}

function Home() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);

      const response = await fetch("https://emage-api.onrender.com/v1/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setAllPosts(data.data.reverse());
      }
    } catch (err) {
      console.log(err);
      // alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  //Neat piece of reusable search function

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchResults(searchResults);
      }, 500)
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#b2b9dd] text-[32px] mb-3">
          Showcase
        </h1>
        <p className="mt-2 text-[14px] max-w-[500px] tracking-widest">
          All these masterpieces were created by Dall-E
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search through Posts"
          name="search"
          type="text"
          placeholder="Search here .."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#b8c4ce] text-xl mb-3">
                Showing results for <span>{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={searchResults} title="No results found" />
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
