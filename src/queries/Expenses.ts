import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useExpenses = (page = 1) => useQuery({
  queryKey: ['expenses', page],
  queryFn: async () => {
    const res = await fetch(`/api/expenses?page=${page}`);
    return res.json();
  },
  keepPreviousData: true,
});


export const useAddExpense = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newExpense: Expense) =>
      fetch('/api/expenses', {
        method: 'POST',
        body: JSON.stringify(newExpense),
      }),,
    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({ queryKey: ['expenses'] });
      const previousExpenses = queryClient.getQueryData(['expenses']);
      queryClient.setQueryData(['expenses'], (old) => [...old, newExpense]);
      return { previousExpenses };
    },
    onError: (err, newExpense, context) => {
      queryClient.setQueryData(['expenses'], context.previousExpenses);
    },
  });
};