import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

// hash tag를 추출해서 처리
const PostCardContent = ({ postData }) => (
  <>
    {postData.split(/(#[^\s#]+)/g).map((v, i) => {
      if (v.match(/(#[^\s#]+)/g)) {
        // 해시태그는 게시글에 포함된 사용자의 의도에 의해 바뀌는 부분이기 때문에
        // key값으로 index 값을 넣어줘도 된다.
        return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>;
      }
      return v;
    }) }
  </>
);

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;
