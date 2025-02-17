/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsteroidChat } from '../models/AsteroidChat';
import type { AsteroidMessage } from '../models/AsteroidMessage';
import type { ChatIds } from '../models/ChatIds';
import type { Run } from '../models/Run';
import type { Status } from '../models/Status';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RunService {
    /**
     * Get all runs for a task
     * @param taskId
     * @returns Run List of runs
     * @throws ApiError
     */
    public static getTaskRuns(
        taskId: string,
    ): CancelablePromise<Array<Run>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/task/{taskId}/run',
            path: {
                'taskId': taskId,
            },
        });
    }
    /**
     * Create a new run for a task
     * @param taskId
     * @param requestBody
     * @returns string Run created
     * @throws ApiError
     */
    public static createRun(
        taskId: string,
        requestBody?: {
            name?: string;
            run_id?: string;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/task/{taskId}/run',
            path: {
                'taskId': taskId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a run
     * @param runId
     * @returns Run Run
     * @throws ApiError
     */
    public static getRun(
        runId: string,
    ): CancelablePromise<Run> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/run/{runId}',
            path: {
                'runId': runId,
            },
            errors: {
                404: `Run not found`,
            },
        });
    }
    /**
     * Delete a run
     * @param runId
     * @returns any Run deleted
     * @throws ApiError
     */
    public static deleteRun(
        runId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/run/{runId}',
            path: {
                'runId': runId,
            },
        });
    }
    /**
     * Update the metadata of a run
     * @param runId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateRunMetadata(
        runId: string,
        requestBody: Record<string, any>,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/run/{runId}/metadata',
            path: {
                'runId': runId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Run not found`,
            },
        });
    }
    /**
     * Get the status of a run
     * @param runId
     * @returns Status Run status
     * @throws ApiError
     */
    public static getRunStatus(
        runId: string,
    ): CancelablePromise<Status> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/run/{runId}/status',
            path: {
                'runId': runId,
            },
            errors: {
                404: `Run not found`,
            },
        });
    }
    /**
     * Update the status of a run
     * @param runId
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static updateRunStatus(
        runId: string,
        requestBody: Status,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/run/{runId}/status',
            path: {
                'runId': runId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Update a run with a result
     * @param runId
     * @param requestBody
     * @returns any Run result created
     * @throws ApiError
     */
    public static updateRunResult(
        runId: string,
        requestBody: {
            result?: string;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/run/{runId}/result',
            path: {
                'runId': runId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
    /**
     * Get the image messages for a run
     * @param runId
     * @returns AsteroidMessage Run image messages
     * @throws ApiError
     */
    public static getRunImageMessages(
        runId: string,
    ): CancelablePromise<Array<AsteroidMessage>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/run/{run_id}/image_messages',
            path: {
                'run_id': runId,
            },
            errors: {
                404: `Run not found`,
            },
        });
    }
    /**
     * Create a new chat completion request from an existing run
     * @param runId
     * @param requestBody
     * @returns ChatIds New chat completion created
     * @throws ApiError
     */
    public static createNewChat(
        runId: string,
        requestBody: AsteroidChat,
    ): CancelablePromise<ChatIds> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/run/{run_id}/chat',
            path: {
                'run_id': runId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `Run not found`,
            },
        });
    }
    /**
     * Get the messages for a run
     * @param runId
     * @param index
     * @returns AsteroidMessage Run messages
     * @throws ApiError
     */
    public static getRunMessages(
        runId: string,
        index: number,
    ): CancelablePromise<Array<AsteroidMessage>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/run/{run_id}/messages/{index}',
            path: {
                'run_id': runId,
                'index': index,
            },
            errors: {
                404: `Run not found`,
            },
        });
    }
    /**
     * Count the number of chat entries for a run
     * @param runId
     * @returns number Number of chat entries for the run
     * @throws ApiError
     */
    public static getRunChatCount(
        runId: string,
    ): CancelablePromise<number> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/run/{run_id}/chat_count',
            path: {
                'run_id': runId,
            },
        });
    }
}
