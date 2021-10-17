const initialState = { authData: null };

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH":
      console.log("payload", action.payload);
      localStorage.setItem("Profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action.payload,
        isLoading: false,
        errors: null,
      };
    case "LOGOUT":
      localStorage.clear();
      console.log("payload", action.payload);
      return {
        ...state,
        authData: action.payload,
        errors: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default usersReducer;
