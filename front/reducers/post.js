const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'lee'
        },
        content: 'first content',
        Images: [{
                src: 'https://images.pexels.com/photos/3998365/pexels-photo-3998365.png'
            },
            {
                src: 'https://images.pexels.com/photos/12064/pexels-photo-12064.jpeg'
            },
            {
                src: 'https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg'
            }
        ],
        Comments: [{
                User: {
                    nickname: 'lee',
                },
                content: 'comment1'
            },
            {
                User: {
                    nickname: 'kim'
                },
                content: 'comment2'
            }
        ]
    }],
    // 업로드된 게시글의 이미지 경로
    imagePaths: [],
    // 게시글 업로드가 완료되었을때
    postAdded: false,
}

const ADD_POST = 'ADD_POST';

export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id: 2,
    content: 'dummy data description',
    User: {
        id: 1,
        nickname: 'cho',
    },
    Images: [],
    Comments: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            {
                return {
                    ...state,
                    mainPosts: [dummyPost, ...state.mainPosts],
                    postAdded: true
                }
            }
        default:
            return {
                ...state
            };
    }
}

export default reducer;