import shortId from 'shortid';
import { ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from '../types/post';

const initialState = {
  mainPosts: [{
    id: 1,
    User: {
      id: 1,
      nickname: 'lee',
    },
    content: '굿잡 #첫번째 해시태그 #두번째 해시태그',
    Images: [{
      id: shortId.generate(),
      src: 'https://images.pexels.com/photos/3998365/pexels-photo-3998365.png',
    },
    {
      id: shortId.generate(),
      src: 'https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg',
    },
    {
      id: shortId.generate(),
      src: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg',
    },
    ],
    Comments: [{
      id: shortId.generate(),
      User: {
        nickname: 'lee',
      },
      content: 'comment1',
    },
    {
      id: shortId.generate(),
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
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
};

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const removePost = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'lee',
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'lee',
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
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        // mainPosts: [dummyPost, ...state.mainPosts],
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      // action.data.content, postId, userId
      // 우선 넘겨받은 게시물의 id를 통해서 어떤 게시물인지 index를 통해 찾는다.
      // 바뀌는 것만 새로운 객체로 만들고 나머지 객체는 참조를 유지해줘야 한다. (불변성)
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex]};
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
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
