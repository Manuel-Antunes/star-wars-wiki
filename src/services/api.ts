import axios from "axios";

export const api = axios.create({
  baseURL: "https://swapi.dev/api",
  params: {
    format: "json",
  },
});

export const generateCharacterImageFromId = (id: number | string) => {
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
};

export const generateMovieImageFromId = (id: number | string) => {
  return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
};

export const getIdFromResourceUrl = (url: string) => {
  return url.split("/").slice(-2)[0];
};
