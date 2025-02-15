import { useQuery } from "@tanstack/react-query";

export const useBalances = () => useQuery({
  queryKey: ['balances'],
  queryFn: async () => {
    const res = await fetch('/api/balances');
    return res.json();
  },
});