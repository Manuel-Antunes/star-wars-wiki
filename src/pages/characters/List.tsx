import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Suspense } from "react";
import { Helmet } from "react-helmet";
import { FormProvider, useForm } from "react-hook-form";
import { Character } from "~/@types/models/Character";
import TableHeader from "~/components/molecules/table/TableHeader";
import TablePagination from "~/components/molecules/table/TablePagination";
import TableComponent from "~/components/organisms/Table";
import { characterColumns } from "~/components/organisms/columns/characterColumns";
import CharacterFilters from "~/components/organisms/filters/CharacterFilter";
import { useDataTable } from "~/hooks/useDataTable";
import MainLayout from "~/layouts/MainLayout";

const ListCharacters = () => {
  const table = useDataTable<Character>(
    "/people",
    {
      columns: characterColumns,
      manualPagination: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    },
    undefined,
    data => {
      return data.map(character => {
        if(character.species.length === 0) {
          return {
            ...character,
            species: ["https://swapi.dev/api/species/1/"],
          };
        }
        return {
          ...character,
        };
      });
    }
  );

  const form = useForm();

  return (
    <MainLayout>
      <Helmet>
        <title>Personagens | Star Wars</title>
      </Helmet>
      <MainLayout.Header>
        <div className="flex items-center space-x-1">
          <h2 className="line-clamp-1 dark:text-navy-50 text-xl font-medium text-slate-700 lg:text-2xl">
            Personagens
          </h2>
        </div>
      </MainLayout.Header>
      <div className="w-full flex flex-col gap-5">
        <FormProvider {...form}>
          <TableHeader<Character> table={table}>
            <Suspense
              fallback={
                <span className="text-sm font-semibold">Carregando...</span>
              }
            >
              <CharacterFilters />
            </Suspense>
          </TableHeader>
        </FormProvider>
        <div className="w-full card mt-3">
          <TableComponent<Character> table={table} />
          <TablePagination<Character> table={table} />
        </div>
      </div>
    </MainLayout>
  );
};

export default ListCharacters;
