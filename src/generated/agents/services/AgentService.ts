/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Agent } from '../models/Agent';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AgentService {
    /**
     * Get all agents
     * @returns Agent List of agents
     * @throws ApiError
     */
    public static getAgents(): CancelablePromise<Array<Agent>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/agents',
        });
    }
}
