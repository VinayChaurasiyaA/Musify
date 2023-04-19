import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/ShazamCore";
import { useEffect } from "react";
const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetSongDetailsQuery({
    songid,
  });
  if (isFetchingSongDetails) {
    return <Loader title="Lyrics" />;
  }
  if (error) {
    return <Error />;
  }
  const newData = songData?.resources?.lyrics;
  const firstObj = Object?.keys(newData)?.[0];
  console.log(firstObj);

  const another = songData?.resources["shazam-songs"];
  const secObj = Object?.keys(another)[0];
  const artistId = secObj;

  const songArtist = songData?.resources?.artists;
  const thirObj = Object?.keys(songArtist)[0];
  const artistid = thirObj;
  console.log(artistid);

  // const {
  //   data: artistData,
  //   isFetching: isArtistDataFetching,
  //   errors,
  // } = useGetSongRelatedQuery({
  //   artistid,
  // });

  const handlePauseClick = () => {
    // todo
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    //todod
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  // console.log(songData?.resources['shazam-songs']?.artistId)
  return (
    <div className="flex flex-col">
      {/* {console.log(newData[firstObj])} */}
      <DetailsHeader
        artistId={artistId}
        artistData={another}
        songData={songData}
      />
      {/* {console.log(newData[30339017].attributes.text)} */}
      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {newData[firstObj]?.type === "lyrics" ? (
            newData[firstObj]?.attributes?.text?.map((line, i) => (
              <p className="text-gray-300 text-base font-medium my-1" key={i}>
                {line}
              </p>
            ))
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry no,Lyrics found
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistid={artistid}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default SongDetails;
