// s08-01 api request with container pattern
// ref. Dan Abramov, Presentational and Container Components
// https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import * as React from 'react';
import axios from 'axios';

import RenderCounter from 'RenderCounter';

function App() {
  const [page, setPage] = React.useState(1);
  const goToPrevPage = () => {
    setPage((p) => p - 1);
  };
  const goToNextPage = () => {
    setPage((p) => p + 1);
  };

  return (
    <div className="component">
      <RenderCounter />
      api request with container pattern
      <div>
        <button onClick={goToPrevPage}>Prev Page</button>
        <button onClick={goToNextPage}>Next Page</button>
      </div>
      <PostsContainer page={page} />
    </div>
  );
}

export default App;

// ----------------------------------------

function fetchPosts(page = 1) {
  return axios
    .get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=4`)
    .then(
      (res) =>
        new Promise((resolve) => {
          // intentionally delay resolve
          setTimeout(() => resolve(res.data), 1000);
        })
    );
}

function PostsContainer({ page }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchPosts(page)
      .then((data) => {
        setIsLoading(false);
        setPosts(data);
      })
      .catch((err) => {
        console.log('e Error', err);
        setIsLoading(false);
        setIsError(true);
      });
  }, [page]);

  console.log('# PostsContainer render', page, Date.now());
  return (
    <PostsPresenter isLoading={isLoading} isError={isError} posts={posts} />
  );
}

function PostsPresenter({ isLoading, isError, posts }) {
  console.log('# render PostsPresenter', Date.now());
  return (
    <div className="component">
      <RenderCounter />
      PostsPresenter
      {isLoading ? (
        <div>loading...</div>
      ) : isError ? (
        <div>some error</div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.id}: {post.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
