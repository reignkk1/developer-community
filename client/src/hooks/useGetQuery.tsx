import { QueryKey, useQueryClient } from 'react-query';

export default function useGetQuery(queryKey: QueryKey) {
  const data = useQueryClient().getQueryData(queryKey);
  return data;
}
