import React, { useState } from "react";
import Loader from "../../Loader";
import { useParams } from "react-router-dom";
import { useGetActorsDetailsQuery } from "../../../Services/TMDB";
const ActorDetail = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useGetActorsDetailsQuery(id);

  if (isFetching) {
    return <Loader />;
  }
  // if (isError) {
  //   return "Nothing Is Found, please try again later!";
  // }
  return (
    <>
      <div>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.title}
          />
        </div>

        <div>
          <p>{data?.title}</p>
          <p>Born {new Date(data?.birthday).toDateString()}</p>
        </div>
      </div>
    </>
  );
};

export default ActorDetail;
