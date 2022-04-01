import { AnyObject } from '../../application/types';
import { ApiHttpService } from './ApiHttpService';

export const makeSWRGlobalFetcher = () => async (path: string) => {
  const response = await ApiHttpService.get<AnyObject>(path);
  return response.data;
};
