import { useMutation, useQuery } from "react-query";

import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API;
axios.defaults.withCredentials = true;

export function useGetAxios<T>(url: string) {
  const { data, isLoading, error } = useQuery<T>(
    ["GET", `${url}`],
    async () => (await axios.get(url)).data
  );

  return { data, isLoading, error };
}
export function usePostAxios<T>(url: string, data: T, onSuccess: () => void) {
  const { mutate, isLoading, error } = useMutation(
    async () => (await axios.post(url, data)).data,
    {
      onSuccess: () => {
        onSuccess();
      },
      onError: (error) => console.log(error),
    }
  );
  return { mutate, isLoading, error };
}
