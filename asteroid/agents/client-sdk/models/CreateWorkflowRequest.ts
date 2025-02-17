/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateWorkflowRequest = {
    /**
     * The name of the workflow.
     */
    name: string;
    /**
     * JSON object containing static workflow configuration (e.g. a prompt_template).
     */
    fields: Record<string, any>;
    /**
     * The prompts for the workflow. They can have variables in them. They will be merged with the dynamic data passed when the workflow is executed.
     */
    prompts: Array<string>;
};

