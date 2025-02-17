/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsteroidToolCall } from './AsteroidToolCall';
import type { MessageType } from './MessageType';
export type AsteroidMessage = {
    id?: string;
    role: AsteroidMessage.role;
    content: string;
    tool_calls?: Array<AsteroidToolCall>;
    /**
     * The type of content in the message, either text or b64 encoded audio
     */
    type?: MessageType;
    created_at?: string;
    /**
     * The raw b64 encoded JSON of the message objects in its original form
     */
    data?: string;
};
export namespace AsteroidMessage {
    export enum role {
        SYSTEM = 'system',
        USER = 'user',
        ASSISTANT = 'assistant',
        FUNCTION = 'function',
        TOOL = 'tool',
        ASTEROID = 'asteroid',
    }
}

