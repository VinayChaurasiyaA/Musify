import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  console.log(artistData[artistId]?.attributes);
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28"></div>
      <div className="absoulte inset-0 flex items-center">
        <img
          src={
            artistId
              ? artistData[artistId]?.attributes?.images?.artistAvatar
              : songData?.images?.coverart
          }
          alt="art"
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
        />
      </div>
      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId
            ? artistData[artistId]?.attributes.title
            : songData?.images?.coverart}
        </p>
        <p className="sm:text-3xl text-base text-gray-400 ">
          {artistId
            ? artistData[artistId]?.attributes.primaryArtist
            : songData?.images?.coverart}
        </p>
        <p className="text-base text-gray-400 mb-1">
          {artistId ? artistData[artistId]?.attributes?.genres?.primary : ""}
        </p>
        {!artistId && (
          <Link to={`/artists/${songData?.artists[0].adamid}`}>
            <p className="text-base text-gray-400 mt-2">{songData?.subtitle}</p>
          </Link>
        )}
        
      </div>
    </div>
  );
};

export default DetailsHeader;
