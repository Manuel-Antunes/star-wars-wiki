import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import React from "react";
import { Helmet } from "react-helmet";
import { Planet } from "~/@types/models/Planet";
import TablePagination from "~/components/molecules/table/TablePagination";
import TableComponent from "~/components/organisms/Table";
import { planetColumns } from "~/components/organisms/columns/planetColumns";
import { useDataTable } from "~/hooks/useDataTable";
import MainLayout from "~/layouts/MainLayout";

const ListPlanets: React.FC = () => {
  const table = useDataTable("/planets", {
    columns: planetColumns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <MainLayout>
      <Helmet>
        <title>Planetas | Star Wars</title>
      </Helmet>
      <MainLayout.Header>
        <span className="flex gap-2">
          <svg
            className="h-7 w-7"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx={12}
              cy={12}
              r={8}
              className="dark:fill-navy-200 fill-slate-500"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.399 4.849C5.372 2.582 2.972 1.489 2.23 2.23c-1.174 1.174 2.248 6.5 7.643 11.895 5.396 5.395 10.722 8.817 11.895 7.643.431-.43.243-1.421-.435-2.769"
              className="dark:fill-navy-200 fill-slate-500 opacity-30"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Planetas
        </span>
      </MainLayout.Header>
      <div className="w-full flex flex-col gap-5">
        <div className="w-full card mt-3">
          <TableComponent<Planet> table={table} />
          <TablePagination<Planet> table={table} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ListPlanets;
