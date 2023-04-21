import React, { useState, useEffect } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import axios from "axios";
import { Anime } from "./types";

// interface Anime {
//   mal_id: number;
//   title_english: string;
//   year: number;
//   episodes: number;
//   score: number;
//   synopsis: string;
//   images: {
//     webp: {
//       image_url: string;
//     };
//   };
//   trailer: {
//     url: string;
//   };
// }

// When the 'handleChange' function is called, the value of the selectedOption
// parameter will be whatever the user has selected in the dropdown list.
// When the user selects an option from the dropdown, the onChange event handler
// is triggered and the selected option is passed to the handleChange function
// as an argument.

// const options = animeList.map((anime) => ({
//   value: anime.mal_id,
//   label: anime.title_english
// }));

interface Props {
  onSelect: (selectedAnime: Anime) => Promise<void>;
}

const DropDownSearch = ({ onSelect }: Props) => {
  const [options, setOptions] = useState<Anime[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("https://api.jikan.moe/v4/anime");
      setOptions(result.data.data);
    };
    fetchData();
  }, []);

  const handleChange = async (
    selectedOption: SingleValue<Anime>,
    actionMeta: ActionMeta<Anime>
  ): Promise<void> => {
    if (selectedOption) {
      const selectedAnime = selectedOption as Anime;
      await onSelect(selectedAnime);
    }
  };

  const formatOptionLabel = ({ title_english, image_url }: Anime) => (
    <div>
      <img src={image_url} alt="" />
      {title_english}
    </div>
  );

  return (
    <Select
      options={options}
      onChange={handleChange}
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export default DropDownSearch;
