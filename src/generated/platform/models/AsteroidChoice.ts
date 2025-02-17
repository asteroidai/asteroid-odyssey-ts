/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsteroidMessage } from './AsteroidMessage';
export type AsteroidChoice = {
    asteroid_id: string;
    index: number;
    message: AsteroidMessage;
    finish_reason: AsteroidChoice.finish_reason;
};
export namespace AsteroidChoice {
    export enum finish_reason {
        STOP = 'stop',
        LENGTH = 'length',
        FUNCTION_CALL = 'function_call',
        TOOL_CALLS = 'tool_calls',
        CONTENT_FILTER = 'content_filter',
    }
}

