import { ExecuteOptions, ExecuteResponse, HttpService, METHOD } from './HttpService';

export class FetchHttpService extends HttpService {
  async execute<T>(method: METHOD, url: string, options?: ExecuteOptions): Promise<ExecuteResponse<T>> {
    const response = await fetch(this.config.baseUrl + url, {
      method,
      body: options?.body ? JSON.stringify(options.body) : undefined,
      headers: options?.headers ? { ...this.config.headers, ...options.headers } : this.config.headers,
      ...(this.config.credentials ? { credentials: this.config.credentials as RequestCredentials } : {}),
    });
    const data = (await response.json()) as T;
    return {
      data,
      statusCode: response.status,
      headers: response.headers,
    };
  }
}
