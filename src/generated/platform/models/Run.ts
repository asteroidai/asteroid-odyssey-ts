/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Status } from './Status';
export type Run = {
    id: string;
    task_id: string;
    created_at: string;
    status?: Status;
    result?: string;
    metadata?: Record<string, any>;
};

