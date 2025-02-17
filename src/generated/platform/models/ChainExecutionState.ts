/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChainExecution } from './ChainExecution';
import type { SupervisionRequestState } from './SupervisionRequestState';
import type { SupervisorChain } from './SupervisorChain';
export type ChainExecutionState = {
    chain: SupervisorChain;
    chain_execution: ChainExecution;
    supervision_requests: Array<SupervisionRequestState>;
};

