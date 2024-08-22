import { useReducer, useContext } from "react";
import { AuthContext, AuthDispatchContext } from "../../auth";

const initialState = {
  isAuthentificated: false,
  loading: false,
  error: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthentificated: true,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthentificated: false,
        error: action.error,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthentificated: false,
        error: null,
      };
    case "REFRESH_TOKEN_SUCCESS":
      return {
        ...state,
      };
    case "REFRESH_TOKEN_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isAuthentificated: true,
        loading: false,
        error: null,
      };
    case "REGISTER_FAILURE":
      return {
        ...state,
        isAuthentificated: false,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const value = { state, dispatch };

  return (
    <AuthContext.Provider value={value}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}
