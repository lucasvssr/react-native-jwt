import getRefreshToken, {
  deleteRefreshToken,
  setRefreshToken,
} from "../hooks/getRefreshToken";
import { deleteJwt, setJwt } from "../hooks/getJwt";

const API_URL = "http://localhost:8000";

function register({ login, password, dispatch }) {
  const postregister = async ({ login, password, dispatch }) => {
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: "REGISTER_FAILURE",
          error: data.message,
        });
        return;
      }

      dispatch({
        type: "REGISTER_SUCCESS",
      });
    } catch (error) {
      dispatch({ type: "REGISTER_FAILURE", error });
    }
  };

  postregister();
}

export function postLogin(login, password, dispatch) {
  const postLogin = async () => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "wrongcredentials") {
          console.log("wrong credentials");
          //register({ login, password, dispatch });
        }

        dispatch({
          type: "LOGIN_FAILURE",
          error: data.message,
        });
        return;
      }

      dispatch({
        type: "LOGIN_SUCCESS",
      });

      console.log(data);
      setJwt(data.jwt);
      setRefreshToken(data.refreshToken);
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", error });
    }
  };

  postLogin();
}

export function logout(dispatch) {
  dispatch({ type: "LOGOUT" });
  deleteRefreshToken();
  deleteJwt();
}

export function refreshToken(dispatch) {
  const req = async () => {
    try {
      const tokenData = await getRefreshToken();

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: tokenData }),
      });

      if (!response.ok) {
        dispatch({
          type: "REFRESH_TOKEN_FAILURE",
          payload: "Failed to refresh token",
        });
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      dispatch({
        type: "REFRESH_TOKEN_SUCCESS",
      });

      console.log("NEW", data);
      setJwt(data.jwt);
      setRefreshToken(data.refreshToken);
    } catch (error) {
      console.error("REFRESH TOKEN", error);
      dispatch({ type: "REFRESH_TOKEN_FAILURE", error });
    }
  };

  req();
}
