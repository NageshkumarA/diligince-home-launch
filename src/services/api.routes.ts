//API Routes tsx
export function generateQueryParams(queryParams: any) {
    const params = new URLSearchParams();
    for (const key in queryParams) {
        const value = queryParams[key as keyof typeof queryParams];
        if (value !== null && value !== undefined && value !== '') {
            params.append(key, String(value));
        }
    }
    const queryString = params.toString();
    return queryString
}
const basePath = '/api/v1'

// src/constants/apiRoutes.ts
export const apiRoutes = {
    industry: {
        dashboard: {
            getAll: (queryParams: any) => {
                const queryString = generateQueryParams(queryParams);
                return `${basePath}/get_service_requests?${queryString}`;
            },
            getById: (id: any) => `${basePath}/request/details/${id}`,
            create: `${basePath}/request/create`
        },
        requirements: {
            create: `${basePath}/create_request_note`,
            getByRequestId: (requestId: number) => `${basePath}/get_request_notes/${requestId}`,
        }
    }
};







