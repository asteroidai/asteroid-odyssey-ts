/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type HubStats = {
    connected_clients: number;
    free_clients: number;
    busy_clients: number;
    assigned_reviews: Record<string, number>;
    review_distribution: Record<string, number>;
    completed_reviews_count: number;
    pending_reviews_count: number;
    assigned_reviews_count: number;
};

