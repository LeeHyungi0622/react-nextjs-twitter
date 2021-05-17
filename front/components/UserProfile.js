import { Card, Avatar, Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch();

    // me data
    const { me, isLoggingOut } = useSelector((state) => state.user);

    const onLogout = useCallback(() => {
        dispatch(logoutRequestAction());
    },[]);
    
    return (
        <Card
        // 카드 아래의 버튼들
            actions={[
                <div key="twit">짹짹<br/>0</div>,
                <div key="followings">팔로잉<br />0</div>,
                <div key="followers">팔로워<br />0</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{me.nickname[0]}</Avatar>}
                title="Lee Hyungi"
            />
            <Button onClick={onLogout} loading={isLoggingOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;