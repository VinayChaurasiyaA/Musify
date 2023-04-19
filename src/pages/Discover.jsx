import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { useGetTopChartsQuery } from "../redux/services/ShazamCore";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";

// Consider whole redux as a CAKE where selector is used to selecting a certain piece whereas dispatch is used to
// add or remove something from that piece of cake
// like if we have to add topping or sparkle on it then we use dispatch (ADD TOPPING AS SPARKe)
const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );
  // console.log(genres);
  const { data, isFetching, error } = useGetTopChartsQuery();
  // console.log(data?.tracks);
  const newData = data?.tracks.slice(2, data?.tracks.length);
  // console.log(newData);
  if (isFetching) {
    return <Loader title="Loading songs...." />;
  }
  if (error) {
    return <Error />;
  }
  const genreTitle = genres.find(({ value }) => value === genreListId?.title);
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-left text-white">
          Discover {genreTitle}
        </h2>
        <select
          value={genreListId || "Pop"}
          onChange={(e) => {
            dispatch(selectGenreListId(e.target.value));
          }}
          className="outline-none bg-black text-gray-300 p-3 text-sm rounded-lg sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.title} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {/* {
        data?.track?.map((song, i) => (
          <SongCard key={song?.key} song={song} i={i} />
        ))
        } */}
        {newData?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={newData}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
