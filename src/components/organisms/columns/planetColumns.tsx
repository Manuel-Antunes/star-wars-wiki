import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Planet } from "~/@types/models/Planet";
import {
  generatePlanetImageFromId,
  getIdFromResourceUrl,
} from "~/services/api";

export const planetColumns: ColumnDef<Planet>[] = [
  {
    id: "planets",
    footer: ({ column: { id } }) => id,
    columns: [
      {
        id: "photo",
        header: "#",
        cell: ({
          row: {
            original: { url, name },
          },
        }) => {
          return (
            <Link to={`/planets/${getIdFromResourceUrl(url)}`}>
              <img
                className="w-24 h-24"
                src={generatePlanetImageFromId(getIdFromResourceUrl(url))}
                alt={name}
              />
            </Link>
          );
        },
      },
      {
        id: "name",
        header: "Nome",
        accessorKey: "name",
      },
      {
        id: "diameter",
        header: "Diâmetro",
        accessorFn: value => `${value.diameter} KM`,
      },
      {
        id: "population",
        header: "População",
        accessorKey: "population",
      },
    ],
  },
];
