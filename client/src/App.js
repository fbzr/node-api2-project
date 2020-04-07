import React, { useState, useEffect } from 'react';
// contextAPI
import { PostsContext } from './context/PostsContext';
// components
import Posts from './components/Posts';
import Comments from './components/Comments';
import PostForm from './components/PostForm';
import { Grid, Header, Container, Button } from 'semantic-ui-react';
// crud operations
import postsCrud from './crud/posts';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await postsCrud.getAllPosts();
      setPosts(res.data);
    })();
  }, []);

  useEffect(() => {
    if(!selectedPost) {
      setEditing(true);
    } 
  }, [selectedPost]);

  const handleCreatePostBtn = () => {
    setSelectedPost(null);
    // setEditing(true);
  }

  return (
    <PostsContext.Provider value={{ 
      posts,
      setPosts,
      selectedPost,
      setSelectedPost,
      editing,
      setEditing
    }}>
      
        <Grid padded centered style={{height: '100vh'}}>
          <Grid.Row style={{height: '10%', maxWidth: '500px'}}>
            <Button onClick={handleCreatePostBtn} style={{width: '100%'}}>Create post</Button>
          </Grid.Row>
          <Grid.Row style={{height: '90%'}}>
            <Grid.Column width={4} style={{height: '100%', marginTop: '10px'}}>
              <Posts />
            </Grid.Column>

            <Grid.Column width={4}>
              {(selectedPost && !editing) && <Comments />}
              {editing && <PostForm />}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      
    </PostsContext.Provider>
  );
}

export default App;