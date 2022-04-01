// this duplication it's to decouple with the rest of the application
interface AnyObject {
  [k: string]: any;
}

export interface HttpServiceConfig {
  baseUrl?: string;
  headers?: AnyObject;
  credentials?: string;
}

export interface ExecuteOptions {
  body?: AnyObject;
  headers?: AnyObject;
}

export interface ExecuteResponse<T> {
  data: T | null | undefined;
  statusCode: number;
  headers: AnyObject;
  metadata?: any;
}

export enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const defaultHttpServiceConfig: HttpServiceConfig = {
  baseUrl: '',
  headers: {},
};

export abstract class HttpService {
  protected config: HttpServiceConfig;

  constructor(initialConfig?: Partial<HttpServiceConfig>) {
    this.config = { ...defaultHttpServiceConfig, ...initialConfig };
  }

  abstract execute<T = any>(method: METHOD, url: string, options?: ExecuteOptions): Promise<ExecuteResponse<T>>;

  async get<T = any>(url: string, options?: ExecuteOptions) {
    return this.execute<T>(METHOD.GET, url, options);
  }

  async post<T = any>(url: string, body: AnyObject, options?: Omit<ExecuteOptions, 'body'>) {
    return this.execute<T>(METHOD.POST, url, options ? { ...options, body } : { body });
  }

  async put<T = any>(url: string, body: AnyObject, options?: Omit<ExecuteOptions, 'body'>) {
    return this.execute<T>(METHOD.PUT, url, options ? { ...options, body } : { body });
  }

  async patch<T = any>(url: string, body: AnyObject, options?: Omit<ExecuteOptions, 'body'>) {
    return this.execute<T>(METHOD.PATCH, url, options ? { ...options, body } : { body });
  }

  async delete<T = any>(url: string, body: AnyObject, options?: Omit<ExecuteOptions, 'body'>) {
    return this.execute<T>(METHOD.DELETE, url, options ? { ...options, body } : { body });
  }
}
