import React, { useState, useEffect } from 'react';
// contextAPI
import { PostsContext } from './context/PostsContext';
// components
import Posts from './components/Posts';
import Comments from './components/Comments';
import PostForm from './components/PostForm';
import { Grid } from 'semantic-ui-react';
// crud operations
import postsCrud from './crud/posts';

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
        <Grid.Column width={4} style={{height: '100vh'}}>
          <Posts />
        </Grid.Column>
      
        <Grid.Column width={4}>
          {selectedPost && <Comments />}
          <PostForm />
        </Grid.Column>
      </Grid>
      
    </PostsContext.Provider>
  );
}

export default App;