/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChainRequest } from '../models/ChainRequest';
import type { Supervisor } from '../models/Supervisor';
import type { SupervisorChain } from '../models/SupervisorChain';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SupervisorService {
    /**
     * Get a supervisor
     * @param supervisorId
     * @returns Supervisor Supervisor
     * @throws ApiError
     */
    public static getSupervisor(
        supervisorId: string,
    ): CancelablePromise<Supervisor> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/supervisor/{supervisorId}',
            path: {
                'supervisorId': supervisorId,
            },
        });
    }
    /**
     * Get all supervisors
     * @param projectId
     * @returns Supervisor List of supervisors
     * @throws ApiError
     */
    public static getSupervisors(
        projectId: string,
    ): CancelablePromise<Array<Supervisor>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/{projectId}/supervisor',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Create a new supervisor
     * @param projectId
     * @param requestBody
     * @returns string Supervisor created
     * @throws ApiError
     */
    public static createSupervisor(
        projectId: string,
        requestBody: Supervisor,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{projectId}/supervisor',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
    /**
     * Get all supervisors for a tool, in chain format
     * @param toolId
     * @returns SupervisorChain List of chains with their supervisors
     * @throws ApiError
     */
    public static getToolSupervisorChains(
        toolId: string,
    ): CancelablePromise<Array<SupervisorChain>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tool/{toolId}/supervisors',
            path: {
                'toolId': toolId,
            },
        });
    }
    /**
     * Create new chains with supervisors for a tool
     * @param toolId
     * @param requestBody
     * @returns string Chains created
     * @throws ApiError
     */
    public static createToolSupervisorChains(
        toolId: string,
        requestBody: Array<ChainRequest>,
    ): CancelablePromise<Array<string>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tool/{toolId}/supervisors',
            path: {
                'toolId': toolId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
