import React, { useState, useEffect, useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
// posts crud opperations
import postsCrud from '../crud/posts';
// components
import { Scrollbars } from 'react-custom-scrollbars';
import { Segment, Icon, Input, Container } from 'semantic-ui-react';

const Comments = () => {
    const { selectedPost } = useContext(PostsContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        (async () => {
            if (selectedPost) {
                const res = await postsCrud.getPostComments(selectedPost.id);
                setComments(res.data);
            }
        })();
    }, [selectedPost, comments]);

    const handleSubmit = async () => {
        const res = await postsCrud.addPostComment(selectedPost.id, newComment);
        setComments(prev => ([
            ...prev,
            res.data
        ]));
        
        setNewComment('');
    }

    const handleInput = e => {
        setNewComment(e.target.value);
    }

    return (
        <Container>
            <h3>Comments</h3>
            <Scrollbars autoHeight>
                {comments.length > 0 ? 
                    <Segment.Group>    
                    {comments.map((comment, index) => (
                        <Segment key={index}>{comment.text}</Segment>
                    ))}
                </Segment.Group>
                :
                <h5>No comments</h5>
                }
            </Scrollbars>
            <Input required icon={
                <Icon name='add' circular link type='submit' onClick={handleSubmit} />
            } value={newComment} onChange={handleInput} name='comment' placeholder='Add a comment' style={{width: '100%', marginTop: '30px'}} />
        </Container>
    )
}

export default Comments
