import React, { createContext, useReducer } from "react";

// reducer
import userReducer from "./userReducer";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || {},
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
