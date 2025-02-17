/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OptimisationRequest } from '../models/OptimisationRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OptimiserService {
    /**
     * Queue an optimisation job
     * @param requestBody
     * @returns any Optimiser job created
     * @throws ApiError
     */
    public static queueOptimisationJob(
        requestBody?: OptimisationRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/optimiser',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
