import React, { useEffect } from "react";
import { PostProps } from "./types";

const Post = ({ nextPage, posts, isLoading }: PostProps) => {
  useEffect(() => {
    const lastPost = document.querySelector(".post:last-child");
    const observer = new IntersectionObserver(
      (param) => {
        if (param[0].isIntersecting) {
          observer.unobserve(lastPost as Element);
          nextPage();
        }
      },
      { threshold: 0.5 }
    );
    if (!lastPost) return;
    observer.observe(lastPost);

    return () => {
      if (lastPost) observer.unobserve(lastPost);
      observer.disconnect();
    };
  }, [posts]);

  return (
    <div className="post-container">
      {posts.map((post, index) => (
        <img
          className="post"
          key={index}
          src={post.download_url}
          alt={post.author}
        />
      ))}
      {isLoading && <h3>Loading...</h3>}
    </div>
  );
};

export default Post;
