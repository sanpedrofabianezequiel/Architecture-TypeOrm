import { AnyObject } from './AnyObject';

export interface ApiResponse<T extends AnyObject> {
  data: T;
  metadata: any;
  error?: any;
}
