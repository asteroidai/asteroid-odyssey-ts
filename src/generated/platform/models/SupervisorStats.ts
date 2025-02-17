/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Statistics for a specific type of supervisor
 */
export type SupervisorStats = {
    total_reviews: number;
    decisions: {
        approve: number;
        reject: number;
        terminate: number;
        modify: number;
        escalate: number;
    };
    /**
     * Average time taken for reviews in seconds
     */
    average_review_time: number;
    /**
     * Score indicating the reliability of this supervisor type (0-1)
     */
    reliability_score: number;
};

