/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from "../app/features/auth.js";

import { FaUserCircle } from "react-icons/fa";
import { fetchToken, createSessionId, moviesApi } from "../app/utils";
import { Link } from "react-router-dom";
const Movies = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");
  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          console.log(2);
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token]);

  return (
    <>
      {!isAuthenticated ? (
        <button onClick={fetchToken} className="flex items-center gap-3">
          Login
          <span>
            <FaUserCircle size={25} />
          </span>
        </button>
      ) : (
        <Link to="/profile">
          <button
  
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
