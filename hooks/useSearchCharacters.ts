// hooks/useSearchCharacters.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCharacters = async (query: string) => {
  if (!query) return [];
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character/?name=${query}`,
  );
  return data.results;
};

export const useSearchCharacters = (query: string) => {
  return useQuery({
    queryKey: ["characters", query],
    queryFn: () => fetchCharacters(query),
    enabled: query.length >= 1, // Only fetch when the query is 3+ characters
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};
