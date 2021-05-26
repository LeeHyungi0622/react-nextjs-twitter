import shortId from 'shortid';
import { produce } from 'immer';
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

const reducer = (state = initialState, action) => produce(state, (draft) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      draft.addPostLoading = true;
      draft.addPostDone = false;
      draft.addPostError = null;
      break;
    case ADD_POST_SUCCESS:
      draft.addPostLoading = false;
      draft.addPostDone = true;
      draft.mainPosts.unshift(dummyPost(action.data));
      break;
    case ADD_POST_FAILURE:
      draft.addPostLoading = false;
      draft.addPostError = action.error;
      break;
    case REMOVE_POST_REQUEST:
      draft.removePostLoading = true;
      draft.removePostDone = false;
      draft.removePostError = null;
      break;
    case REMOVE_POST_SUCCESS:
      draft.removePostLoading = false;
      draft.removePostDone = true;
      draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
      break;
    case REMOVE_POST_FAILURE:
      draft.removePostLoading = false;
      draft.removePostError = action.error;
      break;
    case ADD_COMMENT_REQUEST:
      draft.addCommentLoading = true;
      draft.addCommentDone = false;
      draft.addCommentError = null;
      break;
    case ADD_COMMENT_SUCCESS: {
      const post = draft.mainPosts.find((v) => v.id === action.data.postId);
      post.Comments.unshift(dummyComment(action.data.content));
      draft.addCommentLoading = false;
      draft.addCommentDone = true;
      break;
    }
    case ADD_COMMENT_FAILURE:
      draft.addCommentLoading = false;
      draft.addCommentError = action.error;
      break;
    default:
      break;
  }
});

export default reducer;
