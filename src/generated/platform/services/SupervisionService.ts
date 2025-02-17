/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewPayload } from '../models/ReviewPayload';
import type { SupervisionRequest } from '../models/SupervisionRequest';
import type { SupervisionResult } from '../models/SupervisionResult';
import type { SupervisionStatus } from '../models/SupervisionStatus';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SupervisionService {
    /**
     * Create a supervision request for a supervisor in a chain on a tool call
     * @param toolCallId
     * @param chainId
     * @param supervisorId
     * @param requestBody
     * @returns string Supervision request created
     * @throws ApiError
     */
    public static createSupervisionRequest(
        toolCallId: string,
        chainId: string,
        supervisorId: string,
        requestBody: SupervisionRequest,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tool_call/{toolCallId}/chain/{chainId}/supervisor/{supervisorId}/supervision_request',
            path: {
                'toolCallId': toolCallId,
                'chainId': chainId,
                'supervisorId': supervisorId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request`,
                404: `Not found`,
            },
        });
    }
    /**
     * Get a supervision request status
     * @param supervisionRequestId
     * @returns SupervisionStatus Get the supervision request status
     * @throws ApiError
     */
    public static getSupervisionRequestStatus(
        supervisionRequestId: string,
    ): CancelablePromise<SupervisionStatus> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/supervision_request/{supervisionRequestId}/status',
            path: {
                'supervisionRequestId': supervisionRequestId,
            },
        });
    }
    /**
     * Get a supervision result
     * @param supervisionRequestId
     * @returns SupervisionResult Get the supervision result for a supervision request
     * @throws ApiError
     */
    public static getSupervisionResult(
        supervisionRequestId: string,
    ): CancelablePromise<SupervisionResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/supervision_request/{supervisionRequestId}/result',
            path: {
                'supervisionRequestId': supervisionRequestId,
            },
        });
    }
    /**
     * Create a supervision result for a supervision request
     * @param supervisionRequestId
     * @param requestBody
     * @returns string Supervision result created
     * @throws ApiError
     */
    public static createSupervisionResult(
        supervisionRequestId: string,
        requestBody: SupervisionResult,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/supervision_request/{supervisionRequestId}/result',
            path: {
                'supervisionRequestId': supervisionRequestId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get the review payload for a supervision request
     * @param supervisionRequestId
     * @returns ReviewPayload Review payload for the supervision request
     * @throws ApiError
     */
    public static getSupervisionReviewPayload(
        supervisionRequestId: string,
    ): CancelablePromise<ReviewPayload> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/supervision_request/{supervisionRequestId}/review_payload',
            path: {
                'supervisionRequestId': supervisionRequestId,
            },
            errors: {
                404: `Supervision request not found`,
            },
        });
    }
}
