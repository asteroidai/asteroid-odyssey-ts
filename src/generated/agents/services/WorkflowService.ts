/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkflowExecution } from '../models/WorkflowExecution';
import type { WorkflowExecutionRequest } from '../models/WorkflowExecutionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WorkflowService {
    /**
     * Execute a saved workflow for an agent
     * @param workflowId
     * @param requestBody
     * @returns string Workflow executed successfully, job queued
     * @throws ApiError
     */
    public static executeWorkflow(
        workflowId: string,
        requestBody: WorkflowExecutionRequest,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/workflow/{workflow_id}',
            path: {
                'workflow_id': workflowId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input or missing required fields`,
            },
        });
    }
    /**
     * Get all workflows and their executions
     * @param agentName
     * @returns WorkflowExecution List of workflow executions
     * @throws ApiError
     */
    public static getWorkflowExecutions(
        agentName: string,
    ): CancelablePromise<Array<WorkflowExecution>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/workflow_executions/{agent_name}',
            path: {
                'agent_name': agentName,
            },
        });
    }
}
