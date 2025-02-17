/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Task } from '../models/Task';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TaskService {
    /**
     * Get all tasks for a project
     * @param projectId
     * @returns Task List of tasks
     * @throws ApiError
     */
    public static getProjectTasks(
        projectId: string,
    ): CancelablePromise<Array<Task>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/{projectId}/tasks',
            path: {
                'projectId': projectId,
            },
            errors: {
                404: `Project not found`,
            },
        });
    }
    /**
     * Create a new task
     * @param projectId
     * @param requestBody
     * @returns string Task created
     * @throws ApiError
     */
    public static createTask(
        projectId: string,
        requestBody: {
            name: string;
            description?: string;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project/{projectId}/tasks',
            path: {
                'projectId': projectId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a task
     * @param taskId
     * @returns Task Task
     * @throws ApiError
     */
    public static getTask(
        taskId: string,
    ): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/task/{taskId}',
            path: {
                'taskId': taskId,
            },
        });
    }
}
