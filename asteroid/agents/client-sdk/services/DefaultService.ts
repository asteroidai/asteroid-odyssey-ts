/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateWorkflowRequest } from '../models/CreateWorkflowRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Check the health of the API
     * @returns any API is healthy
     * @throws ApiError
     */
    public static healthCheck(): CancelablePromise<{
        /**
         * The health status of the API
         */
        status?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
            errors: {
                500: `API is unhealthy`,
            },
        });
    }
    /**
     * Create a new workflow for an agent
     * @param agentName
     * @param requestBody
     * @returns string Workflow created successfully
     * @throws ApiError
     */
    public static createWorkflow(
        agentName: string,
        requestBody: CreateWorkflowRequest,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/workflow/{agent_name}/create',
            path: {
                'agent_name': agentName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }
}
