import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../types/user';

const FollowButton = ({ post }) => {
  const { me, followLoading, unfollowLoading } = useSelector((state) => state.user);
  // 팔로잉 여부 체크 (내가 팔로우하고 있는 사람의 게시글인지 확인)
  const isFollowing = me?.Followings?.find((v) => v.id === post.User.id);
  const dispatch = useDispatch();
  const onFollow = useCallback(() => {
    // 이미 팔로우하고 있는 상태라면 언팔로우
    if (isFollowing) {
        // 팔로우 언팔로우 할때에는 data에 해당 유저의 id만 보내주면 된다.
      console.log('FOLLOW ID :', post.User.id);
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);
  return (
    <Button loading={followLoading || unfollowLoading} onClick={onFollow}>
      { isFollowing ? '언팔로우' : '팔로우' }
    </Button>
  );
};

// post를 object말고 shape로 구체화시켜주기
FollowButton.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowButton;
