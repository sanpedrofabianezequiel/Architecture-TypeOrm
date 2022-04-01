import { ExecuteOptions, ExecuteResponse, FetchHttpService, METHOD } from '../../lib/HttpService';
import { API_URL } from '../../config';
import { ApiResponse } from '../../application/types';

class ApiHttpService extends FetchHttpService {
  constructor() {
    super({ baseUrl: API_URL, headers: { 'Content-Type': 'application/json' } });
  }

  async execute<T>(method: METHOD, url: string, options?: ExecuteOptions): Promise<ExecuteResponse<T>> {
    const response = await super.execute<ApiResponse<T>>(method, url, options);
    const { data } = response;
    return {
      ...response,
      data: data?.data,
      metadata: data?.metadata,
    };
  }
}

const instance = new ApiHttpService();

export { instance as ApiHttpService };
