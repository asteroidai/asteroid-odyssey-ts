// This file is auto-generated by @hey-api/openapi-ts

export type OptimisationRequest = {
    /**
     * The run ID that we want to subject to optimisation
     */
    run_id: string;
};

export type ProgressUpdate = {
    /**
     * The execution ID
     */
    execution_id: string;
    /**
     * The progress of the execution
     */
    progress: string;
    /**
     * The date and time the progress was created
     */
    created_at: string;
};

export type Agent = {
    /**
     * The name of the agent
     */
    name: string;
    /**
     * The description of the agent
     */
    description: string;
    /**
     * The visibility of the agent
     */
    visibility: string;
    /**
     * The prompts for the agent
     */
    required_prompts: Array<string>;
    /**
     * The fields that must be provided when creating a workflow for a given agent
     */
    required_fields?: Array<string>;
};

/**
 * A JSON Schema that defines the expected structure and validation rules for workflow results.
 */
export type ResultSchema = {
    [key: string]: unknown;
};

export type CreateWorkflowRequest = {
    /**
     * The name of the workflow.
     */
    name: string;
    /**
     * Used to assign the workflow to a user. Do not use this field.
     */
    user_id?: string;
    result_schema?: ResultSchema;
    /**
     * Field for custom configuration. Do not use.
     */
    fields?: {
        [key: string]: unknown;
    };
    /**
     * The prompts for the workflow. They can have variables in them. They will be merged with the dynamic data passed when the workflow is executed.
     */
    prompts: Array<string>;
    workflow_options?: UnresolvedWorkflowOptions;
    /**
     * The Language Model Provider for the Workflow
     */
    provider: 'openai' | 'anthropic';
    /**
     * The URL to start the workflow.
     */
    start_url: string;
};

export type Workflow = {
    /**
     * Workflow identifier.
     */
    id: string;
    /**
     * The ID of the user who created the workflow.
     */
    user_id: string;
    result_schema: ResultSchema;
    /**
     * Identifier of the associated agent.
     */
    agent_id: string;
    /**
     * The date and time the workflow was created.
     */
    created_at?: string;
    /**
     * Workflow name.
     */
    name: string;
    /**
     * The prompts for the workflow. They can have variables in them. They will be merged with the dynamic data passed when the workflow is executed.
     */
    prompts: Array<string>;
    /**
     * The variables in the prompts.
     */
    prompt_variables?: Array<string>;
    /**
     * Additional options for the workflow. See documentation for more details.
     */
    workflow_options?: {
        [key: string]: unknown;
    };
    /**
     * The URL to start the workflow.
     */
    start_url: string;
    /**
     * JSON object containing static workflow configuration (e.g. a prompt_template).
     */
    fields?: {
        [key: string]: unknown;
    };
};

export type WorkflowExecution = {
    workflow: Workflow;
    executions: Array<Execution>;
};

/**
 * Dynamic values to be merged into the saved workflow configuration.
 */
export type WorkflowExecutionRequest = {
    [key: string]: unknown;
};

export type CredentialsRequest = {
    credentials: Array<Credential>;
};

export type Credential = {
    /**
     * The credential name
     */
    name: string;
    /**
     * The encrypted credential
     */
    data: string;
};

export type CredentialsResponse = {
    /**
     * The name of the workflow
     */
    workflow_name: string;
    credentials: Array<Credential>;
};

export type Execution = {
    /**
     * Execution identifier.
     */
    id: string;
    /**
     * Run ID.
     */
    run_id: string;
    /**
     * Dynamic data to be merged into the saved workflow configuration.
     */
    dynamic_data?: {
        [key: string]: unknown;
    };
    /**
     * Workflow ID.
     */
    workflow_id: string;
    status?: ExecutionStatus;
    /**
     * The result of the execution.
     */
    result: {
        [key: string]: unknown;
    };
    /**
     * The date and time the execution was created.
     */
    created_at: string;
    /**
     * The error that occurred during the execution.
     */
    error?: string;
};

export type ExecutionStatus = {
    /**
     * Execution ID.
     */
    execution_id: string;
    status: Status;
    /**
     * Reason for the status.
     */
    reason?: string;
    /**
     * The date and time the execution status was created.
     */
    created_at: string;
};

/**
 * Status of the execution.
 */
export type Status = 'starting' | 'running' | 'paused' | 'completed' | 'cancelled' | 'failed';

export type BrowserSession = {
    /**
     * Browser session identifier.
     */
    id?: string;
    /**
     * Browser name (Anchor, Browserbase, etc.)
     */
    browser_name?: string;
    /**
     * Execution ID.
     */
    execution_id?: string;
    /**
     * CDP URL.
     */
    cdp_url?: string;
    /**
     * Debugger URL.
     */
    debugger_url?: string;
    /**
     * Session ID.
     */
    session_id?: string;
    /**
     * Session URL.
     */
    session_url?: string;
    /**
     * Recording URL.
     */
    recording_url?: string;
};

export type SlackChannelRequest = {
    /**
     * Slack channel ID.
     */
    slack_channel_id: string;
};

export type File = {
    /**
     * Unique file identifier.
     */
    id: string;
    /**
     * Execution ID associated with the file.
     */
    execution_id: string;
    /**
     * Full GCS object path (e.g., "2023-10-21_14-05-01/1697892305-screenshot.png").
     */
    file_path: string;
    /**
     * File extension.
     */
    file_ext: string;
    /**
     * File name.
     */
    file_name: string;
    /**
     * Size of the file in bytes.
     */
    file_size: number;
    /**
     * MIME type of the file.
     */
    mime_type: string;
    /**
     * Timestamp when the file record was created.
     */
    created_at: string;
    /**
     * Signed URL to download the file.
     */
    signed_url: string;
};

/**
 * A message given to the agent by the user
 */
export type UserMessage = {
    /**
     * Unique identifier for the message
     */
    id: string;
    /**
     * ID of the execution this message belongs to
     */
    execution_id: string;
    /**
     * ID of the user who created the message
     */
    user_id: string;
    /**
     * The message content
     */
    message: string;
    /**
     * When the message was created
     */
    created_at: string;
    /**
     * Whether the message has been injected into the agent's conversation
     */
    injected: boolean;
    /**
     * When the message was injected into the agent's conversation
     */
    injected_at: string;
};

export type CreateMessageRequest = {
    /**
     * The message content
     */
    message: string;
};

/**
 * Optional workflow configuration options. All fields are optional and will use defaults if not specified.
 */
export type UnresolvedWorkflowOptions = {
    /**
     * Maximum number of iterations for the workflow
     */
    max_iterations?: number;
    /**
     * Timeout in seconds per step
     */
    timeout_per_step?: number;
    /**
     * Browser viewport width
     */
    viewport_width?: number;
    /**
     * Browser viewport height
     */
    viewport_height?: number;
    /**
     * Maximum retries for LLM calls
     */
    max_llm_retries?: number;
    /**
     * Delay between retries in seconds
     */
    llm_retry_delay?: number;
    /**
     * Maximum pause duration in minutes
     */
    max_pause_duration?: number;
    /**
     * Status check interval in seconds
     */
    status_check_interval?: number;
    /**
     * Temperature for LLM (0.0 to 1.0)
     */
    temperature?: number;
    /**
     * Prompt template for LLM
     */
    prompt_template?: string;
    /**
     * Allowed tools for LLM
     */
    allowed_tools?: Array<string>;
    /**
     * Require human approval to finish
     */
    require_human_approval_to_finish?: boolean;
};

export type GetOpenApiData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/openapi.yaml';
};

export type GetOpenApiResponses = {
    /**
     * OpenAPI schema
     */
    200: unknown;
};

export type HealthCheckData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/health';
};

export type HealthCheckErrors = {
    /**
     * API is unhealthy
     */
    500: {
        /**
         * The error message
         */
        error?: string;
    };
};

export type HealthCheckError = HealthCheckErrors[keyof HealthCheckErrors];

export type HealthCheckResponses = {
    /**
     * API is healthy
     */
    200: {
        /**
         * The health status of the API
         */
        status?: string;
    };
};

export type HealthCheckResponse = HealthCheckResponses[keyof HealthCheckResponses];

export type GetAgentsData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/agents';
};

export type GetAgentsResponses = {
    /**
     * List of agents
     */
    200: Array<Agent>;
};

export type GetAgentsResponse = GetAgentsResponses[keyof GetAgentsResponses];

export type QueueOptimisationJobData = {
    body?: OptimisationRequest;
    path?: never;
    query?: never;
    url: '/optimiser';
};

export type QueueOptimisationJobResponses = {
    /**
     * Optimiser job created
     */
    202: unknown;
};

export type CreateWorkflowData = {
    body: CreateWorkflowRequest;
    path: {
        agent_name: string;
    };
    query?: never;
    url: '/workflow/{agent_name}/create';
};

export type CreateWorkflowErrors = {
    /**
     * Invalid input
     */
    400: unknown;
};

export type CreateWorkflowResponses = {
    /**
     * The ID of the workflow
     */
    201: string;
};

export type CreateWorkflowResponse = CreateWorkflowResponses[keyof CreateWorkflowResponses];

export type DeleteWorkflowData = {
    body?: never;
    path: {
        workflow_id: string;
    };
    query?: never;
    url: '/workflow/{workflow_id}';
};

export type DeleteWorkflowErrors = {
    /**
     * Workflow not found
     */
    404: {
        error?: string;
    };
};

export type DeleteWorkflowError = DeleteWorkflowErrors[keyof DeleteWorkflowErrors];

export type DeleteWorkflowResponses = {
    /**
     * Workflow deleted successfully
     */
    200: {
        result?: string;
    };
};

export type DeleteWorkflowResponse = DeleteWorkflowResponses[keyof DeleteWorkflowResponses];

export type GetWorkflowData = {
    body?: never;
    path: {
        workflow_id: string;
    };
    query?: never;
    url: '/workflow/{workflow_id}';
};

export type GetWorkflowErrors = {
    /**
     * Workflow not found
     */
    404: unknown;
};

export type GetWorkflowResponses = {
    /**
     * Workflow
     */
    200: Workflow;
};

export type GetWorkflowResponse = GetWorkflowResponses[keyof GetWorkflowResponses];

export type ExecuteWorkflowData = {
    body: WorkflowExecutionRequest;
    path: {
        workflow_id: string;
    };
    query?: never;
    url: '/workflow/{workflow_id}';
};

export type ExecuteWorkflowErrors = {
    /**
     * Invalid input or missing required fields
     */
    400: unknown;
};

export type ExecuteWorkflowResponses = {
    /**
     * Workflow executed successfully, job queued
     */
    202: string;
};

export type ExecuteWorkflowResponse = ExecuteWorkflowResponses[keyof ExecuteWorkflowResponses];

export type GetExecutionsForWorkflowData = {
    body?: never;
    path: {
        workflow_id: string;
    };
    query?: never;
    url: '/workflow/{workflow_id}/executions';
};

export type GetExecutionsForWorkflowResponses = {
    /**
     * Executions for the workflow
     */
    200: Array<Execution>;
};

export type GetExecutionsForWorkflowResponse = GetExecutionsForWorkflowResponses[keyof GetExecutionsForWorkflowResponses];

export type DeleteWorkflowCredentialsData = {
    body?: never;
    path: {
        workflow_id: string;
    };
    query?: never;
    url: '/workflow/{workflow_id}/credentials';
};

export type DeleteWorkflowCredentialsErrors = {
    /**
     * Workflow not found
     */
    404: unknown;
};

export type DeleteWorkflowCredentialsResponses = {
    /**
     * Credentials deleted successfully
     */
    200: unknown;
};

export type GetWorkflowCredentialsData = {
    body?: never;
    path: {
        workflow_id: string;
    };
    query?: never;
    url: '/workflow/{workflow_id}/credentials';
};

export type GetWorkflowCredentialsErrors = {
    /**
     * Workflow not found
     */
    404: unknown;
};

export type GetWorkflowCredentialsResponses = {
    /**
     * The workflow credentials
     */
    200: CredentialsResponse;
};

export type GetWorkflowCredentialsResponse = GetWorkflowCredentialsResponses[keyof GetWorkflowCredentialsResponses];

export type AddWorkflowCredentialData = {
    body: CredentialsRequest;
    path: {
        workflow_id: string;
    };
    query?: never;
    url: '/workflow/{workflow_id}/credentials';
};

export type AddWorkflowCredentialResponses = {
    /**
     * Credentials set successfully
     */
    200: unknown;
};

export type GetCredentialsPublicKeyData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/credentials/public_key';
};

export type GetCredentialsPublicKeyErrors = {
    /**
     * Public key not found
     */
    404: unknown;
};

export type GetCredentialsPublicKeyResponses = {
    /**
     * The public key for credentials
     */
    200: string;
};

export type GetCredentialsPublicKeyResponse = GetCredentialsPublicKeyResponses[keyof GetCredentialsPublicKeyResponses];

export type DeleteExecutionData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/execution/{id}';
};

export type DeleteExecutionErrors = {
    /**
     * Execution not found
     */
    404: {
        error?: string;
    };
};

export type DeleteExecutionError = DeleteExecutionErrors[keyof DeleteExecutionErrors];

export type DeleteExecutionResponses = {
    /**
     * Execution deleted successfully
     */
    200: {
        result?: string;
    };
};

export type DeleteExecutionResponse = DeleteExecutionResponses[keyof DeleteExecutionResponses];

export type GetExecutionData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/execution/{id}';
};

export type GetExecutionErrors = {
    /**
     * Execution not found
     */
    404: unknown;
};

export type GetExecutionResponses = {
    /**
     * Execution
     */
    200: Execution;
};

export type GetExecutionResponse = GetExecutionResponses[keyof GetExecutionResponses];

export type UpdateExecutionStatusData = {
    body: ExecutionStatus;
    path: {
        id: string;
    };
    query?: never;
    url: '/execution/{id}/status';
};

export type UpdateExecutionStatusErrors = {
    /**
     * Invalid input
     */
    400: unknown;
    /**
     * Execution not found
     */
    404: unknown;
};

export type UpdateExecutionStatusResponses = {
    /**
     * Execution status updated
     */
    200: unknown;
};

export type GetBrowserSessionData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/execution/{id}/browser_session';
};

export type GetBrowserSessionErrors = {
    /**
     * Browser session not found
     */
    404: unknown;
};

export type GetBrowserSessionResponses = {
    /**
     * Browser session
     */
    200: BrowserSession;
};

export type GetBrowserSessionResponse = GetBrowserSessionResponses[keyof GetBrowserSessionResponses];

export type SetSlackChannelData = {
    body: SlackChannelRequest;
    path?: never;
    query?: never;
    url: '/slack_channel';
};

export type SetSlackChannelErrors = {
    /**
     * Invalid input
     */
    400: unknown;
    /**
     * Execution not found
     */
    404: unknown;
};

export type SetSlackChannelResponses = {
    /**
     * Slack channel set
     */
    200: unknown;
};

export type GetAgentWorkflowExecutionsData = {
    body?: never;
    path: {
        agent_name: string;
    };
    query?: never;
    url: '/agent/{agent_name}/workflows';
};

export type GetAgentWorkflowExecutionsResponses = {
    /**
     * List of workflow executions
     */
    200: Array<WorkflowExecution>;
};

export type GetAgentWorkflowExecutionsResponse = GetAgentWorkflowExecutionsResponses[keyof GetAgentWorkflowExecutionsResponses];

export type GetExecutionProgressData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/execution/{id}/progress';
};

export type GetExecutionProgressErrors = {
    /**
     * Execution not found
     */
    404: unknown;
};

export type GetExecutionProgressResponses = {
    /**
     * Progress of the execution
     */
    200: Array<ProgressUpdate>;
};

export type GetExecutionProgressResponse = GetExecutionProgressResponses[keyof GetExecutionProgressResponses];

export type GetExecutionFilesData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/execution/{id}/files';
};

export type GetExecutionFilesErrors = {
    /**
     * Execution files not found.
     */
    404: unknown;
};

export type GetExecutionFilesResponses = {
    /**
     * List of file records associated with the execution.
     */
    200: Array<File>;
};

export type GetExecutionFilesResponse = GetExecutionFilesResponses[keyof GetExecutionFilesResponses];

export type GetWorkflowVersionsData = {
    body?: never;
    path: {
        workflow_id: string;
    };
    query?: never;
    url: '/workflow/{workflow_id}/versions';
};

export type GetWorkflowVersionsErrors = {
    /**
     * Workflow not found
     */
    404: unknown;
};

export type GetWorkflowVersionsResponses = {
    /**
     * List of workflow versions
     */
    200: Array<Workflow>;
};

export type GetWorkflowVersionsResponse = GetWorkflowVersionsResponses[keyof GetWorkflowVersionsResponses];

export type GetExecutionUserMessagesData = {
    body?: never;
    path: {
        id: string;
    };
    query?: never;
    url: '/execution/{id}/user_messages';
};

export type GetExecutionUserMessagesErrors = {
    /**
     * Execution not found
     */
    404: unknown;
};

export type GetExecutionUserMessagesResponses = {
    /**
     * List of messages for the execution
     */
    200: Array<UserMessage>;
};

export type GetExecutionUserMessagesResponse = GetExecutionUserMessagesResponses[keyof GetExecutionUserMessagesResponses];

export type CreateExecutionUserMessageData = {
    body: CreateMessageRequest;
    path: {
        id: string;
    };
    query?: never;
    url: '/execution/{id}/user_messages';
};

export type CreateExecutionUserMessageErrors = {
    /**
     * Execution not found
     */
    404: unknown;
};

export type CreateExecutionUserMessageResponses = {
    /**
     * Message created successfully
     */
    201: unknown;
};

export type ClientOptions = {
    baseUrl: `${string}://${string}/api/v1` | (string & {});
};