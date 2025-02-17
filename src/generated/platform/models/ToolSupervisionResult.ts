/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Decision } from './Decision';
export type ToolSupervisionResult = {
    /**
     * The ID of the supervision result
     */
    id: string;
    /**
     * The ID of the tool that the supervision result is for
     */
    tool_id: string;
    /**
     * The name of the tool that the supervision result is for
     */
    tool_name?: string;
    tool_call_id: string;
    /**
     * The ID of the supervisor that made the supervision result
     */
    supervisor_id: string;
    /**
     * The timestamp of when the supervision result was created
     */
    created_at: string;
    /**
     * The decision made by the supervisor
     */
    decision: Decision;
    /**
     * The reasoning behind the decision
     */
    reasoning: string;
    /**
     * The ID of the run that the supervision result is for
     */
    run_id: string;
};

