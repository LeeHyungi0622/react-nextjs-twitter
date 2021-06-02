import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POST_REQUEST } from '../types/post';

const Home = () => {
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostLoading } = useSelector((state) => state.post);
  console.log('mainPost : ', mainPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);

  useEffect(() => {
    // 현재 스크롤 위치
    function onScroll() {
      // 스크롤된 높이를 구하는데 아래 세가지 함수가 많이 쓰인다.
      console.log(
        // (1) 얼마나 내렸는지
        // 가장 최하단으로 스크롤을 내리면, 최 하단으로 내려간 페이지의 최 상단이 마지막 내려간 지점이 된다.
        window.scrollY,

        // (2) 화면에 보이는 길이(최상단에서 하단 스크롤 위까지 길이)
        document.documentElement.clientHeight,

        // (3) 총 길이 (스크롤의 제일 위부터 아래까지 총 길이)
        // (=) window.scrollY + document.documentElement.clientHeight
        document.documentElement.scrollHeight,

        // (1)과 (2)의 합이 (3)과 같을때 스크롤이 가장 최 하단으로 내려갔다는 것을 의미한다.
        // 이 시점에 새로 로딩
      );
      // 끝에서 300px 위보다 더 많이 내렸을때 
      if (window.scrollY + document.documentElement.clientHeight
          > document.documentElement.scrollHeight - 300) {
        // loadPostLoading이 false인 경우에만 새로운 요청을 한다. 
        if (hasMorePosts && !loadPostLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }

    window.addEventListener('scroll', onScroll);

    // 반드시 스크롤했떤 이벤트를 해제시켜줘야 한다.
    // 안그러면 메모리상에 계속 남아있다.
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts, loadPostLoading]);

  return (
    <AppLayout>
      {
                me && <PostForm />
            }
      {
                mainPosts.map((post) => <PostCard key={post.id} post={post} />)
            }
    </AppLayout>
  );
};

export default Home;
