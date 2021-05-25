import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS } from '../types/post';

const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'lee',
    },
    content: '굿잡 #첫번째 해시태그 #두번째 해시태그',
    Images: [{
      src: 'https://images.pexels.com/photos/3998365/pexels-photo-3998365.png',
    },
    {
      src: 'https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg',
    },
    {
      src: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg',
    },
    ],
    Comments: [{
      User: {
        nickname: 'lee',
      },
      content: 'comment1',
    },
    {
      User: {
        nickname: 'kim',
      },
      content: 'comment2',
    },
    ],
  }],
  // 업로드된 게시글의 이미지 경로
  imagePaths: [],
  // 게시글 업로드가 완료되었을때
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: 2,
  content: data,
  User: {
    id: 1,
    nickname: 'cho',
  },
  Images: [],
  Comments: [],
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        // mainPosts: [dummyPost, ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
