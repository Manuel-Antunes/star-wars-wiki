import { Table } from "@tanstack/react-table";

export type DataTable<T> = Table<T> & {
  totalRows: number;
  fetch: () => Promise<void>;
  isLoading: boolean;
};