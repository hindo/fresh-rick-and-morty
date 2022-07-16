type Info = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export type Response<T> = {
  info: Info;
  results: T[];
}