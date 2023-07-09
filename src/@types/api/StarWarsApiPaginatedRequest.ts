export type StarWarsApiPaginatedRequest<T> = {
  count: number;
  next: string;
  previous: string;
  results: Array<T>;
};