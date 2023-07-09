import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { Movie } from "~/@types/models/Movie";
import TableHeader from "~/components/molecules/table/TableHeader";
import TableComponent from "~/components/organisms/Table";
import { movieColumns } from "~/components/organisms/columns/movieColumns";
import MovieFilter from "~/components/organisms/filters/MovieFilter";
import { useDataTable } from "~/hooks/useDataTable";
import MainLayout from "~/layouts/MainLayout";

const ListMovies = () => {
  const table = useDataTable<Movie>("/films", {
    columns: movieColumns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const form = useForm();

  return (
    <MainLayout>
      <Helmet>
        <title>Filmes | Star Wars</title>
      </Helmet>
      <MainLayout.Header>Filmes</MainLayout.Header>
      <div className="w-full flex flex-col gap-5">
        <FormProvider {...form}>
          <TableHeader<Movie> table={table}>
            <MovieFilter />
          </TableHeader>
        </FormProvider>
        <div className="w-full card mt-3">
          <TableComponent<Movie> table={table} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ListMovies;
