export type DefaultParamsType = {
  page: number;
  limit: number;
  search?: string;
  direction: "asc" | "desc";
  order?: string;
  customData: Record<string, unknown>;
};