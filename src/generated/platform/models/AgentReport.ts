/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FailureReport } from './FailureReport';
import type { SupervisorStats } from './SupervisorStats';
/**
 * A comprehensive report on an agent's performance across multiple runs
 */
export type AgentReport = {
    /**
     * Unique identifier for the agent
     */
    agent_id: string;
    /**
     * The text of the prompt used by the agent
     */
    prompt_text?: string;
    /**
     * Total number of runs performed by the agent
     */
    total_runs: number;
    /**
     * Percentage of successful runs (0-100)
     */
    success_rate: number;
    run_statistics: {
        successful_runs?: number;
        failed_runs?: number;
        pending_runs?: number;
        /**
         * Average duration of runs in seconds
         */
        average_run_duration?: number;
    };
    failure_analysis: Array<FailureReport>;
    /**
     * Map of failure categories to their occurrence count
     */
    failure_categories: Record<string, number>;
    supervisor_statistics: {
        total_reviews: number;
        reviews_by_type: Record<string, SupervisorStats>;
    };
    time_period: {
        start_time: string;
        end_time: string;
    };
};

