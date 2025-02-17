/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsteroidToolCall } from '../models/AsteroidToolCall';
import type { RunExecution } from '../models/RunExecution';
import type { Status } from '../models/Status';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ToolCallService {
    /**
     * Get a tool call
     * @param toolCallId
     * @returns AsteroidToolCall Tool call
     * @throws ApiError
     */
    public static getToolCall(
        toolCallId: string,
    ): CancelablePromise<AsteroidToolCall> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tool_call/{toolCallId}',
            path: {
                'toolCallId': toolCallId,
            },
            errors: {
                404: `Tool call not found`,
            },
        });
    }
    /**
     * Update a tool call
     * @param toolCallId
     * @param requestBody
     * @returns AsteroidToolCall Tool call updated
     * @throws ApiError
     */
    public static updateToolCall(
        toolCallId: string,
        requestBody: AsteroidToolCall,
    ): CancelablePromise<AsteroidToolCall> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tool_call/{toolCallId}',
            path: {
                'toolCallId': toolCallId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a tool call status
     * @param toolCallId
     * @returns Status Tool call
     * @throws ApiError
     */
    public static getToolCallStatus(
        toolCallId: string,
    ): CancelablePromise<Status> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tool_call/{toolCallId}/status',
            path: {
                'toolCallId': toolCallId,
            },
        });
    }
    /**
     * Get the modifications to a tool call
     * @param toolCallId
     * @returns AsteroidToolCall Tool call history
     * @throws ApiError
     */
    public static getToolCallHistory(
        toolCallId: string,
    ): CancelablePromise<Array<AsteroidToolCall>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tool_call/{toolCallId}/history',
            path: {
                'toolCallId': toolCallId,
            },
            errors: {
                404: `Tool call not found`,
            },
        });
    }
    /**
     * Get the state of a tool call
     * @param toolCallId
     * @returns RunExecution Tool call state
     * @throws ApiError
     */
    public static getToolCallState(
        toolCallId: string,
    ): CancelablePromise<RunExecution> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tool_call/{toolCallId}/state',
            path: {
                'toolCallId': toolCallId,
            },
        });
    }
}
