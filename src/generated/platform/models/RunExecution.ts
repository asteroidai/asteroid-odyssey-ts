/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsteroidToolCall } from './AsteroidToolCall';
import type { ChainExecutionState } from './ChainExecutionState';
import type { Status } from './Status';
export type RunExecution = {
    toolcall: AsteroidToolCall;
    chains: Array<ChainExecutionState>;
    status: Status;
};

