import React from "react";
import { useEffect, useState, useContext } from "react";
import Banner from "../componets/Banner/Banner";
import Footer from "../componets/Footer/Footer";
import RowPost from "../componets/RowPost/RowPost";
import {
  originals,
  trending,
  comedy,
  horror,
  Adventure,
  SciFi,
  Animated,
  War,
  trendingSeries,
  UpcomingMovies,
} from "../Constants/URLs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { AuthContext } from "../Context/UserContext";

function Home() {
  const { User } = useContext(AuthContext);
  const [watchedMovies, setWatchedMovies] = useState([]);

  useEffect(() => {
    getDoc(doc(db, "WatchedMovies", User.uid)).then((result) => {
      if (result.exists()) {
        const mv = result.data();
        setWatchedMovies(mv.movies);
      }
    });
  }, []);

  return (
    <div>
      <Banner url={trending}></Banner>
      <div className="w-[99%] ml-1">
        <RowPost
          first
          title={<span className="font-bold mb-1 block">Trending Now</span>}
          islarge
          url={trending}
          key={trending}
        ></RowPost>
        <RowPost
          title={<span className="font-bold mb-0 block">Award-Winning TV Shows</span>}
          url={Animated}
          key={Animated}
        ></RowPost>
        {watchedMovies.length !== 0 ? (
          <RowPost
            title={<span className="font-bold mb-2 block">Only On Netflix</span>}
            movieData={watchedMovies}
            key={"Watched Movies"}
          ></RowPost>
        ) : null}
        <RowPost
          title={<span className="font-bold mb-2 block">Netflix Originals</span>}
          islarge
          url={originals}
          key={originals}
        ></RowPost>
        <RowPost
          title={<span className="font-bold mb-2 block">Suspenseful Criminal Investigation TV Dramas</span>}
          
          url={trendingSeries}
          key={trendingSeries}
        ></RowPost>
        <RowPost
          title={<span className="font-bold mb-2 block">Blockbuster US Sci-Fi & Fantasy</span>}
          url={SciFi}
        ></RowPost>
        <RowPost
          title={<span className="font-bold mb-2 block">Cinematography 101</span>}
          url={UpcomingMovies}
        ></RowPost>
        <RowPost
          title={<span className="font-bold mb-2 block">Heartfelt Movies</span>}
          url={comedy}
        ></RowPost>
        <RowPost
          title={<span className="font-bold mb-2 block">Hollywood Action Movies</span>}
          url={Adventure}
        ></RowPost>
        <RowPost
          title={<span className="font-bold mb-2 block">Critically Acclaimed TV Shows</span>}
          url={horror}
        ></RowPost>
        <RowPost
          title={<span className="font-bold mb-2 block">TV Shows Based On Books</span>}
          url={War}
        ></RowPost>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default Home;
