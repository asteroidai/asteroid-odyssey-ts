/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SupervisionStatus } from './SupervisionStatus';
export type SupervisionRequest = {
    id?: string;
    chainexecution_id?: string;
    supervisor_id: string;
    position_in_chain: number;
    status?: SupervisionStatus;
    last_status_checked_at?: string;
};

