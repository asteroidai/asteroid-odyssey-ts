/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { APIKey } from '../models/APIKey';
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiKeyService {
    /**
     * Validate an API key
     * @returns User API key is valid, returns a validated user object
     * @throws ApiError
     */
    public static validateApiKey(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api_key/validate',
            errors: {
                401: `API key is invalid`,
            },
        });
    }
    /**
     * Get all API keys for the current user
     * @returns APIKey API keys
     * @throws ApiError
     */
    public static getApiKeys(): CancelablePromise<Array<APIKey>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api_key',
        });
    }
    /**
     * Create an API key
     * @param requestBody
     * @returns APIKey API key created
     * @throws ApiError
     */
    public static createApiKey(
        requestBody: APIKey,
    ): CancelablePromise<APIKey> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api_key',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Revoke an API key
     * @param requestBody
     * @returns any API key revoked
     * @throws ApiError
     */
    public static revokeApiKey(
        requestBody: {
            id?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api_key',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
}
