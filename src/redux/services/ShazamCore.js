import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// // const options = {
// //   method: "GET",
// //   headers: {
// //     "X-RapidAPI-Key": "4824f33ef7msh6435cd2171dbfbcp110650jsn3fb0159a54de",
// //     "X-RapidAPI-Host": "shazam.p.rapidapi.com",
// //   },
// // };

// // fetch(
// //   "https://shazam.p.rapidapi.com/shazam-events/list?artistId=73406786&l=en-US&from=2022-12-31&limit=50&offset=0",
// //   options
// // )
// //   .then((response) => response.json())
// //   .then((response) => console.log(response))
// //   .catch((err) => console.error(err));

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "4824f33ef7msh6435cd2171dbfbcp110650jsn3fb0159a54de"
        // "KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLza"
      );
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => "/charts/track" }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/shazam-songs/get-details?id=${songid}`,
    }),
    getSongRelated: builder.query({
      query: ({ artistid }) => `/artists/get-top-songs?id=${artistid}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `/artists/get-details?id=${artistId}`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `search?term=${searchTerm}`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetSongsBySearchQuery
} = shazamCoreApi;
