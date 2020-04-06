import React, { useState, useEffect } from 'react';
// contextAPI
import { PostsContext } from './context/PostsContext';
// components
import Posts from './components/Posts';
import PostForm from './components/PostForm';
// crud operations
import postsCrud from './crud/posts';
import { Grid } from 'semantic-ui-react';


function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await postsCrud.getAllPosts();
      setPosts(res.data);
    })();
  }, []);

  return (
    <PostsContext.Provider value={{ 
      posts,
      setPosts,
      selectedPost,
      setSelectedPost
    }}>
      <Grid centered>
        <Grid.Column width={4}>
          <Posts />
        </Grid.Column>
        <Grid.Column width={4}>
          <PostForm />
        </Grid.Column>
      </Grid>
    </PostsContext.Provider>
  );
}

export default App;