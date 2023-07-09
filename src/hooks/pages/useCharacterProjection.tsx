import { useQueries, useQuery } from "@tanstack/react-query";
import { Character } from "~/@types/models/Character";
import { Movie } from "~/@types/models/Movie";
import { Planet } from "~/@types/models/Planet";
import { Specie } from "~/@types/models/Specie";
import { Spaceship } from "~/@types/models/Starship";
import { Vehicle } from "~/@types/models/Vehicle";
import { api, getIdFromResourceUrl } from "~/services/api";

export const useCharacterContent = (character?: Character) => {
  const planetId = getIdFromResourceUrl(character?.homeworld || "");

  const { data: planet } = useQuery<Planet>(
    ["planets", planetId],
    async () => {
      const response = await api.get(`/planets/${planetId}`);
      return response.data;
    },
    {
      suspense: true,
    }
  );

  const starshipQueries = useQueries<Spaceship[]>({
    queries:
      character?.starships.map(starship => ({
        queryKey: ["starships", starship.split("/").slice(-2)[0]],
        queryFn: async () => {
          const response = await api.get(starship);
          return response.data;
        },
        suspense: true,
      })) || [],
  });

  const starships = starshipQueries.map(query => query.data as Spaceship);

  const vehicleQueries = useQueries<Vehicle[]>({
    queries:
      character?.starships.map(starship => ({
        queryKey: ["vehicles", starship.split("/").slice(-2)[0]],
        queryFn: async () => {
          const response = await api.get(starship);
          return response.data;
        },
        suspense: true,
      })) || [],
  });

  const vehicles = vehicleQueries.map(query => query.data as Vehicle);

  const movieQueries = useQueries<Movie[]>({
    queries:
      character?.films.map(movie => ({
        queryKey: ["movies", movie.split("/").slice(-2)[0]],
        queryFn: async () => {
          const response = await api.get(movie);
          return response.data;
        },
        suspense: true,
      })) || [],
  });

  const movies = movieQueries.map(query => query.data as Movie);

  const specieQueries = useQueries<Specie[]>({
    queries:
      character?.species.map(specie => ({
        queryKey: ["species", specie.split("/").slice(-2)[0]],
        queryFn: async () => {
          const response = await api.get(specie);
          return response.data;
        },
        suspense: true,
      })) || [],
  });

  const species = specieQueries.map(query => query.data as Specie);

  return {
    planet,
    starships,
    vehicles,
    movies,
    species,
  };
};
