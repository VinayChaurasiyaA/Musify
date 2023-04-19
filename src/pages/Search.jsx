import { useParams } from "react-router-dom";

import { SongCard, Error, Loader } from "../components";
import { useSelector } from "react-redux";
import { useGetSongsBySearchQuery } from "../redux/services/ShazamCore";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  // console.log(searchTerm)
  const songs = data?.tracks?.hits?.map((song) => song.track);
  if (isFetching) {
    return <Loader />;
  }
  if (error) {
    return <Error />;
  }
  // console.log(data.tra)
  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
        Results:
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            song={song}
            i={i}
            key={song?.key}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
