/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { HubStats } from '../models/HubStats';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StatsService {
    /**
     * Get hub stats
     * @returns HubStats Hub stats
     * @throws ApiError
     */
    public static getHubStats(): CancelablePromise<HubStats> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/stats',
            errors: {
                400: `Invalid request`,
            },
        });
    }
}
