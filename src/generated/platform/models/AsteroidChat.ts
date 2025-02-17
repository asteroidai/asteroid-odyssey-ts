/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChatFormat } from './ChatFormat';
/**
 * The raw b64 encoded JSON of the request and response data sent/received from the LLM.
 */
export type AsteroidChat = {
    request_data: string;
    response_data: string;
    format: ChatFormat;
};

