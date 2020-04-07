import React, { useState, useEffect, useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
// posts crud opperations
import postsCrud from '../crud/posts';
// components
import { Scrollbars } from 'react-custom-scrollbars';
import { Form, Button, Segment } from 'semantic-ui-react';

const Comments = () => {
    const { selectedPost, setSelectedPost } = useContext(PostsContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        (async () => {
            if (selectedPost) {
                const res = await postsCrud.getPostComments(selectedPost.id);
                setComments(res.data);
            }
        })();
    }, [selectedPost]);

    const handleSubmit = async () => {
        const res = await postsCrud.addPostComment(selectedPost.id, newComment);
        setComments([
            ...comments,
            res.data
        ]);
        
        setSelectedPost(null);
        setNewComment('');
    }

    const handleInput = e => {
        setNewComment(e.target.value);
    }

    return (
        <>
            <Scrollbars autoHeight>
                <Segment.Group>    
                    {comments.map(comment => (
                        <Segment>{comment.text}</Segment>
                    ))}
                </Segment.Group>
            </Scrollbars>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <input required value={newComment} onChange={handleInput} name='comment' placeholder='Comment' />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        </>
    )
}

export default Comments
