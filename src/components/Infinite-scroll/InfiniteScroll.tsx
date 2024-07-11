import React, { useEffect, useState } from "react";
import "./infinite-scroll.css";
import Post from "./Post";
import { Item } from "./types";

const InfiniteScroll = () => {
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState<Item[] | []>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const URL = `https://picsum.photos/v2/list?page=${pageNo}&limit=3`;
    (async function () {
      try {
        setIsLoading(true);
        let response = await fetch(URL);
        let data: Item[] = await response.json();
        setData((prevData) => [...prevData, ...data]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (error instanceof Error) setError(error.message);
        else setError("An Error Occured");
      }
    })();
  }, [pageNo]);

  const nextPage = () => {
    setPageNo((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      {error.length > 0 ? (
        <h1>{error}</h1>
      ) : (
        <Post nextPage={nextPage} posts={data} isLoading={isLoading} />
      )}
    </div>
  );
};

export default InfiniteScroll;
