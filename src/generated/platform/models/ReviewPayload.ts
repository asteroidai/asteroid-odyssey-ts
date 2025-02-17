/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsteroidMessage } from './AsteroidMessage';
import type { AsteroidToolCall } from './AsteroidToolCall';
import type { ChainExecutionState } from './ChainExecutionState';
import type { SupervisionRequest } from './SupervisionRequest';
/**
 * Contains all the information needed for a human reviewer to make a supervision decision
 */
export type ReviewPayload = {
    /**
     * The current supervision request being reviewed
     */
    supervision_request: SupervisionRequest;
    /**
     * The state of the entire supervision chain, including previous supervision results
     */
    chain_state: ChainExecutionState;
    /**
     * The tool call being supervised
     */
    toolcall: AsteroidToolCall;
    /**
     * The ID of the run this review is for
     */
    run_id: string;
    /**
     * The messages in the run
     */
    messages: Array<AsteroidMessage>;
};

