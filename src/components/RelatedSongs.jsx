import SongBar from "./SongBar";
import { Loader, Error } from "../components";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/ShazamCore";
// import Loader from "./Loader";

const RelatedSongs = ({
  isPlaying,
  activeSong,
  data,
  artistid,
  handlePauseClick,
  handlePlayClick,
}) => {
  const {
    data: artistData,
    isFetching: isArtistDataFetching,
    errors,
  } = useGetSongRelatedQuery({
    artistid,
  });
  if (isArtistDataFetching) {
    return <Loader title="Recommended songs" />;
  }
  if (errors) {
    return <Error />;
  }
  return (
    <div className="flex flex-col">
      {/* {console.log(artistData)} */}
      <h1 className="font-bold text-3xl text-white">Related Songs:</h1>
      <div className="w-full flex flex-col mt-6">
        {artistData?.data?.map((song, i) => (
          <SongBar
            key={song?.key}
            song={song}
            i={i}
            artistId={artistid}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))}
      </div>
    </div>
  );
};
export default RelatedSongs;
