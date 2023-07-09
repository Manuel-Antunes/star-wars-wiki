import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Character } from "~/@types/models/Character";
import { Movie } from "~/@types/models/Movie";
import { Planet } from "~/@types/models/Planet";
import { romanize } from "~/helpers/romanize";
import MainLayout from "~/layouts/MainLayout";
import {
  api,
  generatePlanetImageFromId,
  getIdFromResourceUrl,
} from "~/services/api";

const ShowPlanet: React.FC = () => {
  const { id } = useParams();

  const { data: planet } = useQuery<Planet>(
    ["planets", id],
    async () => {
      const { data } = await api.get(`/planets/${id}`);
      return data;
    },
    {
      suspense: true,
    }
  );

  const residentQueries = useQueries({
    queries:
      planet?.residents.map(resident => ({
        queryKey: ["characters", getIdFromResourceUrl(resident)],
        queryFn: async () => {
          const { data } = await api.get(resident);
          return data;
        },
        suspense: true,
      })) || [],
  });

  const residents = residentQueries.map(query => query.data as Character);

  const movieQueries = useQueries({
    queries:
      planet?.films.map(movie => ({
        queryKey: ["movies", getIdFromResourceUrl(movie)],
        queryFn: async () => {
          const { data } = await api.get(movie);
          return data;
        },
        suspense: true,
      })) || [],
  });

  const movies = movieQueries.map(query => query.data as Movie);

  return (
    <MainLayout>
      <Helmet>
        <title>{planet?.name} | Star Wars</title>
      </Helmet>
      <div className="container mx-auto my-5 p-5">
        <div className="flex md:grid md:grid-cols-6 gap-4 flex-col justify-center no-wrap md:-mx-2 ">
          <div className="card w-full md:mx-2 md:col-span-3 lg:col-span-2">
            <div className="p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-2/3 mx-auto"
                  src={generatePlanetImageFromId(id || "")}
                  alt=""
                />
              </div>
              <h1 className="text-navy-100 text-center font-bold text-xl leading-8 my-1">
                {planet?.name}
              </h1>
            </div>
          </div>
          <div className="w-full gap-2 md:col-span-3 lg:col-span-4 h-full flex flex-col">
            <div className="card p-3 shadow-sm rounded-sm">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span className="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">Sobre</span>
              </div>
              <div className="text-navy-300">
                <div className="grid md:grid-cols-2 text-sm">
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Nome</div>
                    <div className="px-4 py-2">{planet?.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Período de Rotação
                    </div>
                    <div className="px-4 py-2">{planet?.rotation_period}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Diâmetro</div>
                    <div className="px-4 py-2">{planet?.diameter}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">População</div>
                    <div className="px-4 py-2">{planet?.population}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Período de Órbita
                    </div>
                    <div className="px-4 py-2">{planet?.orbital_period}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Água na Superfície
                    </div>
                    <div className="px-4 py-2">{planet?.surface_water}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Clima</div>
                    <div className="px-4 py-2">{planet?.climate}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Terreno</div>
                    <div className="px-4 py-2">{planet?.terrain}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gravidade</div>
                    <div className="px-4 py-2">{planet?.gravity}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card h-full p-3 shadow-sm rounded-sm">
              <div className="grid grid-cols-3">
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Personagens</span>
                  </div>
                  <ul className="list-inside space-y-2 overflow-y-auto">
                    {residents.length ? (
                      residents?.map(character => (
                        <li key={getIdFromResourceUrl(character.url)}>
                          <Link
                            to={`/characters/${getIdFromResourceUrl(
                              character.url
                            )}`}
                          >
                            <div className="text-teal-600">
                              {character.name}
                            </div>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">
                        Sem personagens
                      </span>
                    )}
                  </ul>
                </div>
                <div>
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span className="text-green-500">
                      <svg
                        className="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Filmes</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {movies.length ? (
                      movies?.map(movie => (
                        <li key={getIdFromResourceUrl(movie.url)}>
                          <Link
                            to={`/movies/${getIdFromResourceUrl(movie.url)}`}
                          >
                            <div className="text-teal-600">{movie.title}</div>
                            <div className="text-gray-500 text-xs">
                              Episódio {romanize(movie.episode_id)}
                            </div>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">
                        Sem planetas
                      </span>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShowPlanet;
