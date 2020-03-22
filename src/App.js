import React, { useEffect, useState } from "react";
import { blogSearch } from "./api";
import "./App.css";
import Item from "./Items";

const App = props => {
  const [blogs, setBlogs] = useState([]);
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      blogSearchHttpHandler(query, true);
    }
  }, [query]);

  const onEnter = e => {
    if (e.keyCode === 13) {
      setQuery(text);
    }
  };
  const onTextUpdate = e => {
    setText(e.target.value);
  };

  const blogSearchHttpHandler = async (query, reset) => {
    const params = {
      query: "query",
      sort: "accuracy",
      page: 1,
      size: 10
    };
    const { data } = await blogSearch(params);
    if (reset) {
      setBlogs(data.documents);
    } else {
      setBlogs(blogs.concat(data.documnets));
    }
  };

  return (
    <div className="container">
      <input
        type="search"
        placeholder="검색어를 입력하세요"
        name="query"
        className="input_search"
        onKeyDown={onEnter}
        onChange={onTextUpdate}
        value={text}
      />
      <ul>
        {blogs.map((blog, index) => (
          <Item
            key={index}
            thumbnail={blog.thumbnail}
            title={blog.title}
            blogname={blog.blogname}
            contents={blog.contents}
            url={blog.url}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
