/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Workflow = {
    /**
     * Workflow identifier.
     */
    id?: string;
    /**
     * Identifier of the associated agent.
     */
    agent_id?: string;
    /**
     * Workflow name.
     */
    name?: string;
    /**
     * Workflow configuration.
     */
    fields?: Record<string, any>;
    /**
     * The prompts for the workflow. They can have variables in them. They will be merged with the dynamic data passed when the workflow is executed.
     */
    prompts?: Array<string>;
    /**
     * The variables in the prompts.
     */
    prompt_variables?: Array<string>;
};

