import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Controller, useFormContext } from "react-hook-form";
import Select from "react-select";
import { StarWarsApiPaginatedRequest } from "~/@types/api/StarWarsApiPaginatedRequest";
import { Movie } from "~/@types/models/Movie";
import { Specie } from "~/@types/models/Specie";
import TextField from "~/components/atoms/forms/TextField";
import WithLabel from "~/components/atoms/forms/WithLabel";
import { api } from "~/services/api";

const genders = [
  {
    label: "Masculino",
    value: "male",
  },
  {
    label: "Feminino",
    value: "female",
  },
  {
    label: "Sem Genero",
    value: "n/a",
  },
];

const CharacterFilters = () => {
  const { control, register } = useFormContext();

  const { data: movies, isLoading: isMoviesLoading } = useQuery<Movie[]>(
    ["movies"] as unknown[],
    async () => {
      const { data } = await api.get("/films");
      return data.results;
    }
  );

  const {
    data: species,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isSpeciesLoading,
  } = useInfiniteQuery<StarWarsApiPaginatedRequest<Specie>>({
    queryKey: ["species"] as unknown[],
    queryFn: async ({ pageParam }) => {
      const { data } = await api.get("/species", {
        params: {
          page: pageParam,
        },
      });
      return data;
    },
    getNextPageParam: lastPage => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        return url.searchParams.get("page");
      }
    },
  });

  const mappedSpecies = species?.pages?.flatMap(specie => {
    return specie.results.map(specie => ({
      label: specie.name,
      value: specie.url,
    }));
  });

  const mappedMovies = movies?.map(movie => {
    return {
      label: movie.title,
      value: movie.url,
    };
  });

  return (
    <>
      <WithLabel className="col-span-12" text="Nome">
        <TextField {...register("search")} />
      </WithLabel>
      <WithLabel className="col-span-12 md:col-span-5 mt-1.5" text="Filmes">
        <Controller
          control={control}
          name="films"
          render={({ field }) => {
            return (
              <Select
                className="react-select-container w-full"
                classNamePrefix="react-select"
                options={mappedMovies || []}
                isMulti
                placeholder="Selecione..."
                isLoading={isMoviesLoading}
                value={(() => {
                  const a = field.value?.map((v: string) =>
                    mappedMovies?.find(m => m.value === v)
                  );
                  return a || [];
                })()}
                loadingMessage={() => "Carregando..."}
                onChange={value => field.onChange(value.map(v => v.value))}
              />
            );
          }}
        />
      </WithLabel>
      <WithLabel className="col-span-8 md:col-span-5 mt-1.5" text="Espécies">
        <Controller
          control={control}
          name="species"
          render={({ field }) => {
            return (
              <Select
                className="react-select-container w-full"
                classNamePrefix="react-select"
                options={mappedSpecies || []}
                isLoading={isFetchingNextPage || isSpeciesLoading}
                loadingMessage={() => "Carregando..."}
                placeholder="Selecione..."
                value={(() => {
                  const a = field.value?.map((v: string) =>
                    mappedSpecies?.find(m => m.value === v)
                  );
                  return a || [];
                })()}
                onChange={value => field.onChange(value.map(v => v.value))}
                onMenuScrollToBottom={() => {
                  fetchNextPage();
                }}
                isMulti
              />
            );
          }}
        />
      </WithLabel>
      <WithLabel text="Gênero" className="col-span-4 md:col-span-2 mt-1.5">
        <Controller
          control={control}
          name="gender"
          render={({ field }) => {
            return (
              <Select
                className="react-select-container w-full"
                classNamePrefix="react-select"
                placeholder="Selecione..."
                options={genders}
                value={genders?.find(m => m.value === field.value)||null}
                onChange={value => field.onChange(value?.value)}
              />
            );
          }}
        />
      </WithLabel>
    </>
  );
};

export default CharacterFilters;
