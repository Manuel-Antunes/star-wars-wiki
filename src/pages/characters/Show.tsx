import { useQuery } from "@tanstack/react-query";
import React from "react";
import Helmet from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Character } from "~/@types/models/Character";
import { useCharacterContent as useCharacterProjection } from "~/hooks/pages/useCharacterProjection";
import MainLayout from "~/layouts/MainLayout";
import {
  api,
  generateCharacterImageFromId,
  generateMovieImageFromId,
  getIdFromResourceUrl,
} from "~/services/api";

const ShowCharacter: React.FC = () => {
  const { id } = useParams();

  const { data: character } = useQuery<Character>(
    ["characters", id],
    async () => {
      const response = await api.get(`/people/${id}`);
      return response.data;
    },
    {
      suspense: true,
    }
  );

  const { movies, planet, species, starships, vehicles } =
    useCharacterProjection(character);

  return (
    <MainLayout>
      <Helmet>
        <title>{character?.name} | Star Wars</title>
      </Helmet>
      <div className="container mx-auto my-5 p-5">
        <div className="flex md:grid md:grid-cols-6 gap-4 flex-col justify-center no-wrap md:-mx-2 ">
          <div className="card w-full md:mx-2 md:col-span-3 lg:col-span-2">
            <div className="p-3 border-t-4 border-green-400">
              <div className="image overflow-hidden">
                <img
                  className="h-auto w-2/3 mx-auto"
                  src={generateCharacterImageFromId(id || "")}
                  alt=""
                />
              </div>
              <h1 className="text-navy-100 text-center font-bold text-xl leading-8 my-1">
                {character?.name}
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
                    <div className="px-4 py-2">{character?.name}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Gênero</div>
                    <div className="px-4 py-2">{character?.gender}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Altura</div>
                    <div className="px-4 py-2">
                      {character?.height &&
                        (+character?.height / 100).toFixed(2)}{" "}
                      M
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Planeta Natal</div>
                    <a
                      href="#"
                      className="text-blue-800 px-4 py-2"
                      title="Em Breve"
                    >
                      {planet?.name}
                    </a>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Cor dos Olhos</div>
                    <div className="px-4 py-2">{character?.eye_color}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Cor da Pele</div>
                    <div className="px-4 py-2">{character?.skin_color}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">Cor do Cabelo</div>
                    <div className="px-4 py-2">{character?.hair_color}</div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="px-4 py-2 font-semibold">
                      Ano De Nascimento
                    </div>
                    <div className="px-4 py-2">{character?.birth_year}</div>
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span className="tracking-wide">Naves</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {starships.length ? (
                      starships?.map(starship => (
                        <li key={getIdFromResourceUrl(starship.url)}>
                          <div className="text-teal-600">
                            <a href="#" title="Em breve">
                              {starship.name}
                            </a>
                          </div>
                          <div className="text-gray-500 text-xs">
                            {starship.model}
                          </div>
                        </li>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">Sem naves</span>
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
                    <span className="tracking-wide">Veículos</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {vehicles.length ? (
                      vehicles?.map(vehicle => (
                        <li key={getIdFromResourceUrl(vehicle.url)}>
                          <div className="text-teal-600">{vehicle.name}</div>
                          <div className="text-gray-500 text-xs">
                            {vehicle.model}
                          </div>
                        </li>
                      ))
                    ) : (
                      <span className="text-gray-500 text-xs">
                        Sem veículos
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
                    <span className="tracking-wide">Espécies</span>
                  </div>
                  <ul className="list-inside space-y-2">
                    {species.length ? (
                      species?.map(specie => (
                        <li key={getIdFromResourceUrl(specie.url)}>
                          <div className="text-teal-600">{specie.name}</div>
                          <div className="text-gray-500 text-xs">
                            {specie.classification}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li>
                        <div className="text-teal-600">Human (Like)</div>
                        <div className="text-gray-500 text-xs">mammal</div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {/* End of Experience and education grid */}
            </div>
          </div>
          <div className="card p-3 hover:shadow col-span-6">
            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
              <span className="text-green-500">
                <svg
                  className="h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span>Filmes</span>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-between overflow-y-auto">
              {movies.map(movie => (
                <Link
                  key={getIdFromResourceUrl(movie.url)}
                  to={`/movies/${getIdFromResourceUrl(movie.url)}`}
                  className="text-center my-2"
                >
                  <img
                    className="h-80 w-64"
                    src={generateMovieImageFromId(
                      getIdFromResourceUrl(movie.url)
                    )}
                    alt={movie.title}
                  />
                  <span className="text-main-color">
                    {movie.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ShowCharacter;
