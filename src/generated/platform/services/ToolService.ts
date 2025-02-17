/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Tool } from '../models/Tool';
import type { ToolSupervisionResult } from '../models/ToolSupervisionResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ToolService {
    /**
     * Get all tools for a run
     * @param runId
     * @returns Tool List of tools
     * @throws ApiError
     */
    public static getRunTools(
        runId: string,
    ): CancelablePromise<Array<Tool>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/run/{runId}/tool',
            path: {
                'runId': runId,
            },
        });
    }
    /**
     * Create a new tool for a run
     * @param runId
     * @param requestBody
     * @returns Tool Tool found
     * @throws ApiError
     */
    public static createRunTool(
        runId: string,
        requestBody: {
            name: string;
            description: string;
            attributes: Record<string, any>;
            ignored_attributes?: Array<string>;
            code: string;
        },
    ): CancelablePromise<Tool> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/run/{runId}/tool',
            path: {
                'runId': runId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a tool
     * @param toolId
     * @returns Tool Tool
     * @throws ApiError
     */
    public static getTool(
        toolId: string,
    ): CancelablePromise<Tool> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tool/{toolId}',
            path: {
                'toolId': toolId,
            },
            errors: {
                404: `Tool not found`,
            },
        });
    }
    /**
     * Get all tools for a project
     * @param projectId
     * @returns Tool List of tools
     * @throws ApiError
     */
    public static getProjectTools(
        projectId: string,
    ): CancelablePromise<Array<Tool>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/{projectId}/tools',
            path: {
                'projectId': projectId,
            },
        });
    }
    /**
     * Get the supervision results for a tool
     * @param toolId
     * @returns ToolSupervisionResult Supervision results
     * @throws ApiError
     */
    public static getToolSupervisionResults(
        toolId: string,
    ): CancelablePromise<Array<ToolSupervisionResult>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tool/{tool_id}/supervision_results',
            path: {
                'tool_id': toolId,
            },
            errors: {
                404: `Tool not found`,
            },
        });
    }
}
