// s08-02 api request with custom hook
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

  console.log('# render App', page, Date.now());
  return (
    <div className="component">
      <RenderCounter />
      api request with custom hook
      <div>
        <button onClick={goToPrevPage}>Prev Page</button>
        <button onClick={goToNextPage}>Next Page</button>
      </div>
      <Posts page={page} />
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

const fetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH': {
      return { ...state, isLoading: true, isError: false };
    }
    case 'FETCH_SUCCESS': {
      return { ...state, isLoading: false, posts: action.posts };
    }
    case 'FETCH_FAILURE': {
      return { ...state, isLoading: true, isError: true };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const initialState = {
  isLoading: false,
  isError: false,
  posts: [],
};

function usePosts(page) {
  const [state, dispatch] = React.useReducer(fetchReducer, initialState);

  React.useEffect(() => {
    dispatch({ type: 'FETCH' });
    fetchPosts(page)
      .then((data) => {
        dispatch({ type: 'FETCH_SUCCESS', posts: data });
      })
      .catch((err) => {
        console.log('e Error', err);
        dispatch({ type: 'FETCH_FAILURE' });
      });
  }, [page]);

  return state;
}

function Posts({ page }) {
  const { isLoading, isError, posts } = usePosts(page);

  console.log('# render Posts', page, Date.now());
  return (
    <div className="component">
      <RenderCounter />
      Posts
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
