import { Table, TableOptions, useReactTable } from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useState } from "react";
import { flushSync } from "react-dom";
import { api } from "~/services/api";

type DefaultParamsType = {
  page: number;
  limit: number;
  search?: string;
  direction: "asc" | "desc";
  order?: string;
  customData: Record<string, unknown>;
};

const defaultParams: DefaultParamsType = {
  page: 1,
  limit: 10,
  search: "",
  direction: "asc",
  order: "",
  customData: {},
};

export type StarWarsApiPaginatedRequest<T> = {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
};

export type AdonisTable<T> = Table<T> & {
  totalRows: number;
  fetch: () => Promise<void>;
  isLoading: boolean;
};

export const useAdonisTable = <T,>(
  url: string,
  options: Omit<TableOptions<T>, "data">,
  partialDefault: Partial<DefaultParamsType> = defaultParams
): AdonisTable<T> => {
  //* hooks
  const [data, setData] = useState<T[]>([]);
  const [pageCount, setPageCount] = useState<number>(options.pageCount || 0);

  const table = useReactTable({
    ...options,
    data,
    pageCount,
    onStateChange: state => {
      setTableState(state);
    },
  }) as AdonisTable<T>;

  //* states
  const [totalRows, setTotalRows] = useState(2);
  const [loading, setLoading] = useState(false);
  const [tableState, setTableState] = useState(table.initialState);

  //* constants
  const defaultData = useMemo(
    () =>
      partialDefault ? { ...defaultParams, ...partialDefault } : defaultParams,
    [partialDefault]
  );

  //* handlers
  const fetch = useCallback(async () => {
    setLoading(true);
    const params: DefaultParamsType = {
      ...defaultData,
    };
    if (tableState) {
      params.limit = tableState?.pagination.pageSize;
      params.page = tableState?.pagination.pageIndex + 1;
      if (tableState?.sorting.length) {
        params.order = tableState?.sorting[0].id;
        params.direction = tableState?.sorting[0].desc ? "desc" : "asc";
      }
      params.customData = tableState?.globalFilter;
    }
    const paramsData = {
      ...params,
      customData: undefined,
      ...params.customData,
    };
    try {
      const {
        data: { count, results },
      } = await api.get<StarWarsApiPaginatedRequest<T>>(url, {
        params: paramsData,
      });
      setData(results);
      setPageCount(Math.ceil(count / params.limit));
      setTotalRows(count);
    } finally {
      flushSync(() => {
        setLoading(false);
      });
    }
  }, [setLoading, defaultData, tableState, url]);

  //* effects
  useEffect(() => {
    if (table) {
      fetch();
    }
  }, [tableState.sorting, tableState.globalFilter, tableState.pagination, table, fetch]);

  //* assignments
  table.isLoading = loading;
  table.fetch = fetch;
  table.totalRows = totalRows;

  //* return
  return table;
};
