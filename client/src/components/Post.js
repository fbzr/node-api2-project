import React, { useContext } from 'react';
import { PostsContext } from '../context/PostsContext';
import { Card, Button, Icon } from 'semantic-ui-react';

const Post = ({ post }) => {
    const { title, contents } = post;
    const { setSelectedPost, setEditing } = useContext(PostsContext);

    const handleCardClick = () => {
        setSelectedPost(post);
        setEditing(false);
    }

    const handleEditBtnClick = e => {
        e.stopPropagation();
        setSelectedPost(post);
        setEditing(true);
    }

    return (
        <Card onClick={handleCardClick} style={{margin: '10px'}}>
            <Card.Content>
                <Card.Header>{title}</Card.Header>
                <Card.Description style={{marginBottom: '15px'}}>
                    {contents}
                </Card.Description>
                <Button icon basic style={{border: '0px'}} onClick={handleEditBtnClick}>
                    <Icon name='edit' />
                </Button>
            </Card.Content>
        </Card>
    )
}

export default Post;