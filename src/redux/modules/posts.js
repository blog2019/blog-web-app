import { combineReducers } from "redux";
import { get, put, post } from "../../utils/request";
import url from "../../utils/url";
import { actions as appActions } from "./app";

const initialState = {
  byId: {},
  allIds: []
}

// action types
export const types = {
  CREATE_POST: 'POSTS/CREATE_POST',
  EDIT_POST: 'POSTS/EDIT_POST',
  FETCH_ALL_POSTS: 'POSTS/FETCH_ALL_POSTS',
  FETCH_POST: 'POSTS/FETCH_POST'
}

// actions
export const actions = {
  fetchAllPosts: () => {
    return (dispatch, getState) => {
      if (shouldFetchAllPosts(getState())) {
        dispatch(appActions.startRequest());
        return get(url.getPostList()).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error) {
            const { posts, postsIds, authors } = convertPostsToPlain(data);
            dispatch(fetchAllPostsSuccess(posts, postsIds, authors));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    };
  },
  fetchPost: (id) => {
    return (dispatch, getState) => {
      if (shouldFetchPost(id, getState())) {
        dispatch(appActions.startRequest());
        return get(url.getPostById(id)).then(data => {
          dispatch(appActions.finishRequest());
          if (!data.error) {
            const { post, author } = convertSinglePostToPlain(data[0]);
            dispatch(fetchPostSuccess(post, author));
          } else {
            dispatch(appActions.setError(data.error));
          }
        });
      }
    }
  },
  createPost: (title, content) => {
    return (dispatch, getState) => {
      const state = getState();
      const author = state.auth.userId;
      const params = {
        title,
        content,
        author,
        vote: 0
      };

      dispatch(appActions.startRequest());
      return post(url.createPost(), params).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(createPostSuccess(data));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  },
  editPost: (id, post) => {
    return (dispatch, getState) => {
      dispatch(appActions.startRequest());
      console.log(post);
      return put(url.updatePost(id), post).then(data => {
        dispatch(appActions.finishRequest());
        if (!data.error) {
          dispatch(updatePostSuccess(data));
        } else {
          dispatch(appActions.setError(data.error));
        }
      });
    };
  }
}

// sub-state
const fetchAllPostsSuccess = (posts, postIds, authors) => ({
  type: types.FETCH_ALL_POSTS,
  posts,
  postIds,
  users: authors
});
// sub-state
const fetchPostSuccess = (post, author) => ({
  type: types.FETCH_POST,
  post,
  user: author
})
// sub-state
const createPostSuccess = post => ({
  type: types.CREATE_POST,
  post: post
});
// sub-state
const updatePostSuccess = post => ({
  type: types.EDIT_POST,
  post: post
});

const shouldFetchAllPosts = state => {
  return !state.posts.allIds || state.posts.allIds.length === 0;
};

const shouldFetchPost = (id, state) => {
  return !state.posts.byId[id] || state.posts.allIds.length === 0;
}

const convertPostsToPlain = posts => {
  let postsById = {};
  let postsIds = [];
  let authorsById = {};

  posts.forEach(item => {
    postsById[item.id] = { ...item, author: item.author.id };
    postsIds.push(item.id);

    if (!authorsById[item.author.id]) {
      authorsById[item.author.id] = item.author;
    }
  });

  return {
    posts: postsById,
    postsIds,
    authors: authorsById
  }
};

const convertSinglePostToPlain = post => {
  // return {
  //   post: { ...post, author: post.author.id },
  //   author: { ...post.author }
  // }
  const plainPost = { ...post, author: post.author.id };
  const author = { ...post.author };
  return {
    post: plainPost,
    author
  };
};

const allIds = (state = initialState.allIds, action) => {
  switch (action.type) {
    case types.FETCH_ALL_POSTS:
      return action.postIds;
    case types.CREATE_POST:
      return [action.post.id, ...state];
    default:
      return state;
  }
}

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
    case types.FETCH_ALL_POSTS:
      return action.posts;
    case types.FETCH_POST:
    case types.CREATE_POST:
    case types.EDIT_POST:
      return {
        ...state, 
        [action.post.id]: action.post
      }
    default:
      return state;
  }
};

const reducer = combineReducers({
  allIds,
  byId
});

export default reducer;

// selectors
export const getPostIds = state => state.posts.allIds;

export const getPostList = state => state.posts.byId;

export const getPostById = (state, id) => state.posts.byId[id];