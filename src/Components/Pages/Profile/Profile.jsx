import { useSelector } from "react-redux";
import { useGetListQuery } from "../../../Services/TMDB";
import MoviesCard from "../../MoviesCard";

const Profile = () => {
  const { user } = useSelector((s) => s.user);

  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <div className="text-center my-10 mb-4">
        <h1>My Profile</h1>
      </div>
      <div className="px-10 mt-10">
        <h1>UserName: {user.username}</h1>
        <button onClick={logout}>Logout </button>
      </div>
      {!favoriteMovies?.results?.length ? (
        <h1 className="mb-10 text-center">
          Add favorites or watchList some movies to see them here!
        </h1>
      ) : (
        <h1 className="mb-10 text-center">FAVORITE MOVIES</h1>
      )}
      <div className="flex gap-3 items-center justify-center px-3 flex-wrap">
        {favoriteMovies?.results?.map((movie) => (
          <MoviesCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
