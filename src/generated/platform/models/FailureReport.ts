/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsteroidToolCall } from './AsteroidToolCall';
import type { FailureCategory } from './FailureCategory';
import type { SupervisionResult } from './SupervisionResult';
/**
 * Detailed information about a specific failure
 */
export type FailureReport = {
    run_id: string;
    timestamp: string;
    failure_category: FailureCategory;
    /**
     * Detailed explanation of the failure
     */
    failure_reason: string;
    supervisor_decisions: Array<SupervisionResult>;
    tool_context?: {
        tool_name: string;
        tool_call: AsteroidToolCall;
    };
    severity: FailureReport.severity;
    /**
     * Suggested action to prevent similar failures
     */
    remediation_suggestion?: string;
};
export namespace FailureReport {
    export enum severity {
        LOW = 'low',
        MEDIUM = 'medium',
        HIGH = 'high',
        CRITICAL = 'critical',
    }
}

