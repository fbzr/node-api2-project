import React, { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
// components
import Post from './Post';
import { Scrollbars } from 'react-custom-scrollbars';

const Posts = () => {
    const { posts } = useContext(PostsContext);
    return (
        <Scrollbars>
            <div style={{marginRight: '25px'}}>
                {posts.map(post => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        </Scrollbars>
    );
}

export default Posts;