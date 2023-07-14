import { useMutation, useQuery } from "react-query";

import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.withCredentials = true;

// GET
export function useGetAxios<T>(url: string, onSuccess?: () => void) {
  const { data, isLoading, error } = useQuery<T>(
    ["GET", `${url}`],
    async () => (await axios.get(url)).data,
    {
      onSuccess: () => onSuccess && onSuccess(),
      onError: (error) => console.log(error),
    }
  );

  return { data, isLoading, error };
}

// POST
export function usePostAxios<T>(url: string, data: T, onSuccess?: () => void) {
  const { mutate, isLoading, error } = useMutation(
    async () => (await axios.post(url, data)).data,
    {
      onSuccess: () => onSuccess && onSuccess(),
      onError: (error) => console.log(error),
    }
  );
  return { mutate, isLoading, error };
}

// DELETE
export function useDeleteAxios(url: string, onSuccess?: () => void) {
  const { mutate, isLoading, error } = useMutation(
    async () => (await axios.delete(url)).data,
    {
      onSuccess: () => onSuccess && onSuccess(),
      onError: (error) => console.log(error),
    }
  );
  return { mutate, isLoading, error };
}

// PATCH
export function usePatchAxios<T>(url: string, data: T, onSuccess?: () => void) {
  const { mutate, isLoading, error } = useMutation(
    async () => (await axios.patch(url, data)).data,
    {
      onSuccess: () => onSuccess && onSuccess(),
      onError: (error) => console.log(error),
    }
  );
  return { mutate, isLoading, error };
}
