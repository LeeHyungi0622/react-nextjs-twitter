import React, { useCallback, useState } from 'react';
import { Card, Popover, Button} from 'antd';
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Avatar from 'antd/lib/avatar/avatar';
import PostImages from '../components/PostImages';

const PostCard = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const { me } = useSelector((props) => props.user);
    const id = me?.id;
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    },[]);
    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    },[]);
    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images}/>}
                // 배열 안에 jsx를 넣어 줄 때에는 반드시 속성으로 key를 넣어줘야 한다.
                actions={[
                    <RetweetOutlined key="retweet"/>,
                    liked ? (<HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike}/>) :  (<HeartOutlined key="heart" onClick={onToggleLike} />),
                    <MessageOutlined key="comment" onClick={onToggleComment}/>,
                    <Popover key="more" content={(
                        <Button.Group>
                            {id && post.User.id === id ? (
                                <>
                                    <Button>수정</Button>
                                    <Button type="danger">삭제</Button>
                                </>
                            ) : <Button>신고</Button>}
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}>
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
            {commentFormOpened && (
                <div>
                    댓글 부분
                </div>
            )}
            {/* <CommentForm /> */}
            {/* <Comments /> */}
            
        </div>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number,
        // object는 shape({})를 사용해서 더 구체적으로 속성의
        // 타입을 정의할 수 있다. 
        User: PropTypes.object,
        content: PropTypes.string,
        createdAt: PropTypes.object,
        Comment: PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired
};


export default PostCard;