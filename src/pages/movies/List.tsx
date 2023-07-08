import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from "@tanstack/react-table";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { Movie } from "~/@types/models/Movie";
import TableHeader from "~/components/molecules/table/TableHeader";
import TableComponent from "~/components/organisms/Table";
import { movieColumns } from "~/components/organisms/columns/movieColumns";
import MovieFilter from "~/components/organisms/filters/MovieFilter";
import { useAdonisTable } from "~/hooks/useAdonisTable";
import MainLayout from "~/layouts/MainLayout";

const ListMovies = () => {
  const table = useAdonisTable<Movie>("/films", {
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
      <MainLayout.Header>
        <div className="flex items-center space-x-1">
          <h2 className="line-clamp-1 dark:text-navy-50 text-xl font-medium text-slate-700 lg:text-2xl">
            Filmes
          </h2>
        </div>
      </MainLayout.Header>
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
