import axios from "axios";

export const API_BASE_URL = "https://swapi.dev/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
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

export const generatePlanetImageFromId = (id: number | string) => {
  return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
};

export const getIdFromResourceUrl = (url: string) => {
  const id = url.split("/").slice(-2)[0];
  return id;
};