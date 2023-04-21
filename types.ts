export interface Anime {
  mal_id: number;
  synopsis: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  trailer: {
    url: string;
  };
  url: string;
  image_url: string;
  title: string;
  airing: boolean;
  type: string;
  episodes: number | null;
  score: number | null;
  start_date: string | null;
  end_date: string | null;
  members: number;
  rated: string | null;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  source: string;
  season: string | null;
  year: number | null;
}
