/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Feedback } from '../models/Feedback';
import type { FeedbackRequest } from '../models/FeedbackRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ImproveService {
    /**
     * Get feedback for a run
     * @param runId
     * @returns Feedback Feedback
     * @throws ApiError
     */
    public static getFeedback(
        runId: string,
    ): CancelablePromise<Array<Feedback>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/run/{run_id}/feedback',
            path: {
                'run_id': runId,
            },
            errors: {
                404: `Run not found`,
            },
        });
    }
    /**
     * Create feedback for a run
     * @param runId
     * @param requestBody
     * @returns any Feedback created
     * @throws ApiError
     */
    public static createFeedback(
        runId: string,
        requestBody: FeedbackRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/run/{run_id}/feedback',
            path: {
                'run_id': runId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Run not found`,
            },
        });
    }
}
