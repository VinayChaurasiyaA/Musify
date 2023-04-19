import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
} from "../redux/services/ShazamCore";
import { useEffect } from "react";
const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { isPlaying, activeSong } = useSelector((state) => state.player);
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetSongDetailsQuery(artistId);
  if (isFetchingArtistDetails) {
    return <Loader title="Artist Details" />;
  }
  if (error) {
    return <Error />;
  }
  // console.log(songData);
  // const newData = songData?.resources?.lyrics;
  // const firstObj = Object?.keys(newData)?.[0];
  // console.log(firstObj);

  // const another = songData?.resources["shazam-songs"];
  // const secObj = Object?.keys(another)[0];
  // const artistId = secObj;

  // const songArtist = songData?.resources?.artists;
  // const thirObj = Object?.keys(songArtist)[0];
  // const artistid = thirObj;
  // console.log(artistid);

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
        artistData={artistData}
        // songData={songData}
      />
      {/* {console.log(newData[30339017].attributes.text)} */}
      {/* <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          
        </div>
      </div> */}
      {/* {console.log(Object.values(artistData))} */}
      <RelatedSongs
        // data={Object.values(artistData)}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistid={artistId}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
