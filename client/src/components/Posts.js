import React, { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
// components
import Post from './Post';

const Posts = () => {
    const { posts } = useContext(PostsContext);
    return (
        <>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </>
    );
}

export default Posts;