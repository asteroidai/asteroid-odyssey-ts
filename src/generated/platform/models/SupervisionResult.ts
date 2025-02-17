/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Decision } from './Decision';
export type SupervisionResult = {
    id?: string;
    supervision_request_id: string;
    toolcall_id?: string;
    created_at: string;
    decision: Decision;
    reasoning: string;
};

