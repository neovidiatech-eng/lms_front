import api from '../../../lib/axios';
import { ParentFormData } from '../../../lib/schemas/ParentSchema';
import { ParentChildrenResponse, CreateParentResponse } from '../../../types/parent';

export const getParentChildren = async (): Promise<ParentChildrenResponse> => {
  const response = await api.get('/parent/students');
  return response.data;
};

export const createParent = async (parentData: ParentFormData): Promise<CreateParentResponse> => {
  const response = await api.post('/system/stuff/create-parent', parentData);
  return response.data;
};
