import React, { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { fetchToken, createSessionId, moviesApi } from "../app/utils";
import { Link } from "react-router-dom";
const Movies = () => {
  const isAuthenticated = false;
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");
  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
        }
      }
    };
  }, [token]);

  return (
    <>
      {!isAuthenticated ? (
        <button
          //to="/profile/id"
          onClick={fetchToken}
          className="flex items-center gap-3"
        >
          Login
          <span>
            <FaUserCircle size={25} />
          </span>
        </button>
      ) : (
        <Link to="/profile/id">
          <button
            to="/profile/id"
            onClick={() => {
              fetchToken();
            }}
            className="flex items-center gap-3"
          >
            My Movies
            <span>
              <FaUserCircle size={25} />
            </span>
          </button>
        </Link>
      )}
    </>
  );
};

export default Movies;
