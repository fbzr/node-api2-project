import React, { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { Card } from 'semantic-ui-react';

const Post = ({ post }) => {
    const { title, contents } = post;
    const { setSelectedPost } = useContext(PostsContext);
    return (
        <Card onClick={() => setSelectedPost(post)} style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Description>
                    {contents}
                </Card.Description>
            </Card.Content>
        </Card>
    )
}

export default Post;