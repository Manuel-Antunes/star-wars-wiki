import { useQueries } from "@tanstack/react-query";
import { Character } from "~/@types/models/Character";
import { Movie } from "~/@types/models/Movie";
import { Planet } from "~/@types/models/Planet";
import { api } from "~/services/api";

export const useMovieProjection = (movie?: Movie) => {
  const planetQueries = useQueries<Planet[]>({
    queries:
      movie?.planets.map(planet => ({
        queryKey: ["planets", planet.split("/").slice(-2)[0]],
        queryFn: async () => {
          const response = await api.get(planet);
          return response.data;
        },
        suspense: true,
      })) || [],
  });

  const planets = planetQueries.map(query => query.data as Planet);

  const characterQueries = useQueries<Character[]>({
    queries:
      movie?.characters.map(character => ({
        queryKey: ["characters", character.split("/").slice(-2)[0]],
        queryFn: async () => {
          const response = await api.get(character);
          return response.data;
        },
        suspense: true,
      })) || [],
  });

  const characters = characterQueries.map(query => query.data as Character);

  return {
    planets,
    characters,
  }
};
