import React, { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
// components
import Post from './Post';
import { Scrollbars } from 'react-custom-scrollbars';

const Posts = () => {
    const { posts } = useContext(PostsContext);
    return (
        <Scrollbars>
            {posts.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </Scrollbars>
    );
}

export default Posts;