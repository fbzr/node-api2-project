import React, { useState, useEffect, useContext } from 'react';
// semantic-ui
import { Button, Form, Icon } from 'semantic-ui-react';
// crud operations
import postsCrud from '../crud/posts';
// context
import { PostsContext } from '../context/PostsContext';

const initialPost = {
    title: '',
    contents: ''
}

const PostForm = () => {
    const { posts, setPosts, selectedPost, setSelectedPost, editing } = useContext(PostsContext);
    const [post, setPost] = useState(selectedPost || initialPost);

    useEffect(() => {
        setPost(selectedPost ? selectedPost : initialPost);
    }, [selectedPost]);

    const handleInput = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async () => {
        try {
            if (post.id) {
                const res = await postsCrud.updatePost(post);
                setPosts(posts.map(item => item.id === res.data.id ? res.data : item));
            } else {
                const res = await postsCrud.addPost(post);
                setPosts([
                    ...posts,
                    res.data
                ]);
            }

            setPost(initialPost);
            setSelectedPost(null);
        } catch(err) {
            console.dir(err);
        }
    }

    const handleDelete = async () => {
        try {
            await postsCrud.deletePost(post.id);
            setPosts(posts.filter(item => item.id !== post.id));
            setPost(initialPost);
            setSelectedPost(null);
        } catch(err) {
            console.dir(err);
        }
    }

    return (
        editing && (
            <Form onSubmit={handleSubmit}>
                <h1>{selectedPost ? 'Edit post' : 'Add post'}</h1>
                <Form.Field>
                    <label>Title</label>
                    <textarea required rows='5' cols='30' value={post.title} onChange={handleInput} name='title' placeholder='Title' />
                </Form.Field>
                <Form.Field>
                    <label>Contents</label>
                    <input required value={post.contents} onChange={handleInput} name='contents' placeholder='Contents' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
                {selectedPost && 
                <Button icon onClick={handleDelete}>
                    <Icon name='trash alternate' />
                </Button>}
            </Form>
        )
    )
}

export default PostForm;
