/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Project } from '../models/Project';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProjectService {
    /**
     * Get all projects
     * @returns Project List of projects
     * @throws ApiError
     */
    public static getProjects(): CancelablePromise<Array<Project>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project',
        });
    }
    /**
     * Create a new project
     * @param requestBody
     * @returns string Project found
     * @throws ApiError
     */
    public static createProject(
        requestBody: {
            name: string;
            run_result_tags: Array<string>;
        },
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/project',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
            },
        });
    }
    /**
     * Get a project
     * @param projectId
     * @returns Project Project
     * @throws ApiError
     */
    public static getProject(
        projectId: string,
    ): CancelablePromise<Project> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/project/{projectId}',
            path: {
                'projectId': projectId,
            },
            errors: {
                404: `Project not found`,
            },
        });
    }
    /**
     * Delete a project
     * @param projectId
     * @returns any Project deleted
     * @throws ApiError
     */
    public static deleteProject(
        projectId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/project/{projectId}',
            path: {
                'projectId': projectId,
            },
            errors: {
                404: `Project not found`,
            },
        });
    }
}
