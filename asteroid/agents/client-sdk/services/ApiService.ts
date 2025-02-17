/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApiService {
    /**
     * Get the OpenAPI schema
     * @returns any OpenAPI schema
     * @throws ApiError
     */
    public static getOpenApi(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/openapi.yaml',
        });
    }
}
