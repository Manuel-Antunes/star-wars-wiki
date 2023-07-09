import { useQueries } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Character } from "~/@types/models/Character";
import {
  api,
  generateCharacterImageFromId,
  getIdFromResourceUrl,
} from "~/services/api";

export const characterColumns: ColumnDef<Character>[] = [
  {
    id: "characters",
    footer: ({ column: { id } }) => id,
    columns: [
      {
        id: "photo",
        header: "#",
        cell: ({
          row: {
            original: { url },
          },
        }) => {
          const id = getIdFromResourceUrl(url);
          return (
            <Link
              to={`/characters/${id}`}
              className="flex flex-col gap-0.5 justify-start"
            >
              <img
                src={generateCharacterImageFromId(id)}
                alt="Character"
                className="w-24 h-32"
              />
            </Link>
          );
        },
        footer: ({ column: { id } }) => id,
      },
      {
        id: "name",
        header: "Nome",
        accessorKey: "name",
        cell: ({
          row: {
            original: { url },
          },
          getValue,
        }) => {
          getIdFromResourceUrl;
          const id = getIdFromResourceUrl(url);
          return (
            <Link
              to={`/characters/${id}`}
              className="flex flex-col gap-0.5 justify-start"
            >
              <span className="text-sm font-semibold">{getValue()}</span>
            </Link>
          );
        },
        footer: ({ column: { id } }) => id,
      },
      {
        id: "birth_year",
        header: "Ano do Nascimento",
        accessorKey: "birth_year",
        footer: ({ column: { id } }) => id,
      },
      {
        id: "mass",
        header: "Peso",
        accessorKey: "mass",
        cell(props) {
          return <span className="text-sm">{props.getValue()} KG</span>;
        },
        footer: ({ column: { id } }) => id,
      },
      {
        id: "height",
        header: "Altura",
        accessorKey: "height",
        cell(props) {
          return (
            <span className="text-sm">
              {(props.getValue() / 100).toFixed(2)} M
            </span>
          );
        },
        footer: ({ column: { id } }) => id,
      },
      {
        id: "species",
        accessorKey: "species",
        header: "Espécie",
        enableGlobalFilter: true,
        footer: ({ column: { id } }) => id,
        cell(props) {
          const ids: string[] =
            props.getValue()?.map((url: string) => getIdFromResourceUrl(url)) ||
            [];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const specieQueries = useQueries({
            queries: ids.map(id => ({
              queryKey: ["species", id],
              queryFn: () => api.get(`species/${id}`).then(res => res.data),
            })),
          });
          return (
            <div className="flex flex-col gap-0.5 justify-start">
              {specieQueries.length ? (
                specieQueries?.map((specieQuery, index) => {
                  if (specieQuery?.isLoading) {
                    return (
                      <span key={index}>
                        <div className="spinner is-elastic h-7 w-7 animate-spin rounded-full border-[3px] border-primary border-r-transparent dark:border-accent dark:border-r-transparent"></div>
                      </span>
                    );
                  }
                  if (specieQuery?.isError) {
                    return <span key={index}>Erro ao carregar</span>;
                  }
                  return (
                    <div
                      key={index}
                      className="badge bg-primary text-white dark:bg-accent"
                    >
                      {specieQuery.data.name}
                    </div>
                  );
                })
              ) : (
                <div className="badge bg-primary text-white dark:bg-accent">
                  Human
                </div>
              )}
            </div>
          );
        },
      },
    ],
  },
];
