// s08-03 api request with react-query
import * as React from 'react';
import axios from 'axios';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';

import RenderCounter from 'RenderCounter';

const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
  },
};
const queryClient = new QueryClient({ defaultOptions });

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
    <QueryClientProvider client={queryClient}>
      <div className="component">
        <RenderCounter />
        api request with react-query
        <div>
          <button onClick={goToPrevPage}>Prev Page</button>
          <button onClick={goToNextPage}>Next Page</button>
        </div>
        <Posts page={page} />
      </div>
    </QueryClientProvider>
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

function Posts({ page }) {
  const postQuery = useQuery(['page', page], () => fetchPosts(page));
  const { isLoading, isFetching, isError, data: posts } = postQuery;

  console.log('# render Posts', page, isLoading, posts?.length, Date.now());
  return (
    <div className="component">
      <RenderCounter />
      Posts {isFetching ? 'fetching...' : ''}
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
