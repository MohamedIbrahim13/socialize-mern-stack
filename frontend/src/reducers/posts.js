const initialState = { isLoading: true, posts: [] };

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_POSTS":
      //console.log('payload',action.payload)
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case "SEARCH":
      console.log("payload", action.payload);
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    case "GET_ONE":
      return { ...state, post: action.payload.post, isLoading: false };
    case "LIKE":
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "CREATE":
      return { ...state, posts: [...state.posts, action.payload] };
    case "COMMENT":
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "UPDATE":
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case "DELETE":
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
      };
    default:
      return state;
  }
};

export default postsReducer;
