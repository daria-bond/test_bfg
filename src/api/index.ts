import axios, { AxiosPromise } from "axios";

const makeRequest = axios;

export const get = <T>(url: string): AxiosPromise<T> =>
  makeRequest({
    url,
    method: "get",
  });
