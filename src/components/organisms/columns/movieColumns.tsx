import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Movie } from "~/@types/models/Movie";
import { generateMovieImageFromId } from "~/services/api";

export const movieColumns: ColumnDef<Movie>[] = [
  {
    id: "movies",
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
          const id = url.split("/").slice(-2)[0];
          return (
            <Link
              to={`/movies/${id}`}
              className="flex flex-col gap-0.5 justify-start"
            >
              <img
                src={generateMovieImageFromId(id)}
                alt="Character"
                className="w-24 h-24"
              />
            </Link>
          );
        },
        footer: ({ column: { id } }) => id,
      },
      {
        id: "title",
        header: "Nome",
        accessorKey: "title",
        cell: ({
          row: {
            original: { url },
          },
          getValue,
        }) => {
          const id = url.split("/").slice(-2)[0];
          return (
            <Link
              to={`/movies/${id}`}
              className="flex flex-col gap-0.5 justify-start"
            >
              <span className="text-sm font-semibold">{getValue()}</span>
            </Link>
          );
        },
        footer: ({ column: { id } }) => id,
      },
    ],
  },
];