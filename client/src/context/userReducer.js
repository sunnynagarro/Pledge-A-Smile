const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {},
      };
    case "CHANGE_IMPACT_LEVEL":
      return {
        ...state,
        user: {
          ...state.user,
          impactLevel: action.payload.level,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
