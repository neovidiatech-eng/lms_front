import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createParent } from '../services/parentServices';
import { ParentFormData } from '../../../lib/schemas/ParentSchema';

export const useCreateParent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ParentFormData) => createParent(data),
    onSuccess: () => {
      // Invalidate the parents list query so it refetches
      queryClient.invalidateQueries({ queryKey: ['parents'] });
    },
  });
};
