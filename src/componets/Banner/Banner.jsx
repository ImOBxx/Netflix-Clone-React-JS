import React, { useState, useEffect, useContext } from "react";
import { API_KEY, imageUrl } from "../../Constants/Constance";
import axios from "../../axios";
import { PopUpContext } from "../../Context/moviePopUpContext";
import { Fade } from "react-reveal";
import StarRatings from "react-star-ratings";
import MoviePopUp from "../PopUp/MoviePopUp";
import usePlayMovie from "../../CustomHooks/usePlayMovie";
import YouTube from "react-youtube";

function Banner(props) {
  const { showModal, setShowModal } = useContext(PopUpContext);
  const { playMovie } = usePlayMovie();

  const [movie, setMovie] = useState({});
  const [moviePopupInfo, setMoviePopupInfo] = useState({});
  const [urlId, setUrlId] = useState("");

  useEffect(() => {
    axios.get(props.url).then((response) => {
      const randomMovie = response.data.results.sort(() => 0.5 - Math.random())[0];
      setMovie(randomMovie);

      axios
        .get(`/movie/${randomMovie.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then((res) => {
          const trailer = res.data.results.find((vid) => vid.type === "Trailer");
          if (trailer) {
            setUrlId(trailer.key);
          }
        });
    });
  }, [props.url]);

  const handleMoviePopup = (movieInfo) => {
    setMoviePopupInfo(movieInfo);
    setShowModal(true);
  };

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      controls: 0,
      loop: 1,
    },
  };

  return (
    <>
      <div className="relative h-[90rem] md:h-[100rem] 5xl:h-[93rem]">
        {/* Video Trailer */}
        {urlId ? (
          <YouTube
            videoId={urlId}
            opts={opts}
            className="absolute top-0 left-0 w-full h-full"
          />
        ) : (
          <div
            style={{
              backgroundImage: `linear-gradient(90deg, hsl(0deg 0% 7% / 91%) 0%, hsl(0deg 0% 0% / 0%) 35%, hsl(220deg 26% 44% / 0%) 100%), url(${
                movie ? imageUrl + movie.backdrop_path : ""
              })`,
            }}
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          ></div>
        )}

        {/* Movie Details */}
        <div className="absolute top-40 sm:top-1/2 left-8 sm:left-16 text-white">
          <Fade bottom>
            <h1 className="text-xl sm:text-8xl font-bold mb-4">
              {movie.title || movie.name}
            </h1>
            <div className="flex items-center mb-0.2">
              
              {movie.release_date && (
                <span className="ml-4 text-gray-300 text-lg">
                  
                </span>
              )}
            </div>
            <p className="w-full md:w-1/2 lg:w-1/3 text-lg line-clamp-3">
              {movie.overview}
            </p>

            {/* Buttons */}
            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => playMovie(movie)}
                className="flex items-center bg-white text-black font-semibold py-2 px-6 rounded hover:bg-gray-200 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Play
              </button>

              <button
                onClick={() => handleMoviePopup(movie)}
                className="flex items-center bg-gray-600 bg-opacity-70 text-white font-semibold py-2 px-6 rounded hover:bg-gray-700 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 8a1 1 0 112 0v5a1 1 0 11-2 0V8zm1 9a1.25 1.25 0 110-2.5A1.25 1.25 0 0112 17z"
                    clipRule="evenodd"
                  />
                </svg>
                More Info
              </button>
            </div>
          </Fade>
        </div>
      </div>

      {showModal && <MoviePopUp data1={moviePopupInfo} data2={urlId} />}
    </>
  );
}

export default Banner;
