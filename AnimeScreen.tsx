import React, { useState, useEffect } from "react";
import DropDownSearch from "./DropdownSearch";
import ReactPlayer from "react-player/youtube";
import axios from "axios";
import { Anime } from "./types";

const AnimeScreen = () => {
  const [selectedAnime, setSelectedAnime] = useState<Anime>();
  const [favouriteList, setFavouriteList] = useState([]);

  useEffect(() => {
    // Load Favourites from localStorage on component mount
    loadFavourites();
  }, []);

  const handleSelect = async (selectedAnime: Anime): Promise<void> => {
    console.log(
      "url:",
      `https://api.jikan.moe/v4/anime/${selectedAnime.mal_id}`
    );
    const result = await axios.get(
      `https://api.jikan.moe/v4/anime/${selectedAnime.mal_id}`
    );
    setSelectedAnime(result.data.data);
  };

  const saveToFavourites = () => {
    const favourites = localStorage.getItem("favourites");
    const favouriteList = favourites ? JSON.parse(favourites) : [];

    // Add selected Anime to Favourites
    favouriteList.unshift(selectedAnime);

    // Store updated favourites to localStorage
    localStorage.setItem("favourites", JSON.stringify(favouriteList));

    // Update State with new Favourite
    setFavouriteList(favouriteList);
  };

  const loadFavourites = () => {
    // Load Favourites from localStorage
    const favourites = localStorage.getItem("favourites");
    const favouriteList = favourites ? JSON.parse(favourites) : [];
    setFavouriteList(favouriteList);
  };

  return (
    <div className="App">
      <DropDownSearch onSelect={handleSelect} />
      {selectedAnime && (
        <div>
          <h2>{selectedAnime.title_english}</h2>
          <img src={selectedAnime.images.webp.image_url} alt="" />
          <p>{selectedAnime.synopsis}</p>
          <p>Year: {selectedAnime.year}</p>
          <p>Episodes: {selectedAnime.episodes}</p>
          <p>Score: {selectedAnime.score}</p>
          {selectedAnime.trailer.url ? (
            <ReactPlayer
              url={selectedAnime.trailer.url}
              controls
              width="50%"
              //height="50%"
              crossOrigin="anonymous"
              style={{ paddingTop: "50px", paddingBottom: "50px" }}
            />
          ) : (
            <p>Sorry, Anime trailer doesn't exist!</p>
          )}
        </div>
      )}
      {selectedAnime && (
        <button onClick={saveToFavourites}>Save to Favourites</button>
      )}
      <button onClick={loadFavourites}>Favourites</button>
    </div>
  );
};

export default AnimeScreen;
