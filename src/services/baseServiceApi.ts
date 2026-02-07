import { ApiError } from '@/services/ApiError.model.ts';

export type QueryParams = Record<
    string,
    string | number | boolean | null | undefined
>;

export class BaseApiService {
    protected readonly baseUrl = import.meta.env.VITE_API_BASE_URL;

    protected async get<T>(path: string, params: QueryParams = {}): Promise<T> {
        const url = this.buildUrl(path, params);
        const res = await fetch(url);

        if (!res.ok) {
            throw new ApiError(res.status, await res.text());
        }

        const body = await res.json();
        return body.data ?? body;
    }

    protected buildUrl(path: string, params: QueryParams): string {
        const search = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                search.append(key, String(value));
            }
        });

        return `${this.baseUrl}${path}${search.size ? `?${search}` : ''}`;
    }
}

export class ApiClient extends BaseApiService {
    /**
     * Exposition volontaire de GET
     * Surface publique minimale
     */
    public request<T>(path: string, params: QueryParams = {}): Promise<T> {
        return this.get<T>(path, params);
    }
}
