import { createClient } from '@hey-api/client-fetch';
import * as AgentsSDK from './generated/agents/sdk.gen';
import type { Client } from '@hey-api/client-fetch';
import type {
  CreateWorkflowRequest,
  WorkflowExecutionRequest,
  Execution
} from './generated/agents/types.gen';

/**
 * Create an API client with a provided API key.
 *
 * @param apiKey - Your API key.
 * @returns A configured API client.
 *
 * @example
 * const client = AsteroidClient('your-api-key');
 */
export const AsteroidClient = (apiKey: string): Client => {
  return createClient({
    baseUrl: 'https://odyssey.asteroid.ai/api/v1',
    headers: {
      'X-Asteroid-Agents-Api-Key': apiKey
    }
  });
};

/**
 * Create a new workflow for a given agent.
 *
 * @param client - The API client.
 * @param agentName - The name of the agent.
 * @param workflowDetails - The workflow details.
 * @returns The ID of the created workflow.
 *
 * @example
 * const workflowId = await createNewWorkflow(client, 'my-agent', {
 *    name: "Example Workflow",
 *    result_schema: {},
 *    fields: { exampleField: "value" },
 *    prompts: ["Enter some data:"],
 *    provider: 'openai'
 * });
 */
export const createNewWorkflow = async (
  client: Client,
  agentName: string,
  workflowDetails: CreateWorkflowRequest
): Promise<string> => {
  // Add a workflow_name key to the workflowDetails.fields object
  // This field is deprecated and will be removed in a future version.
  workflowDetails.fields.workflow_name = workflowDetails.name;

  const response = await AgentsSDK.createWorkflow({
    client,
    path: { agent_name: agentName },
    body: workflowDetails,
  });

  if (response.error) {
    console.log(response.error);
    throw new Error(response.error as string);
  }

  return response.data as string;
};

/**
 * Execute an existing workflow.
 *
 * @param client - The API client.
 * @param workflowId - The workflow identifier.
 * @param executionData - The dynamic data to merge with the workflow.
 * @returns The execution ID.
 *
 * @example
 * const executionId = await executeWorkflowById(client, workflowId, { input: "some dynamic value" });
 */
export const executeWorkflowById = async (
  client: Client,
  workflowId: string,
  executionData: WorkflowExecutionRequest
): Promise<string> => {
  const response = await AgentsSDK.executeWorkflow({
    client,
    path: { workflow_id: workflowId },
    body: executionData,
  });

  if (response.error) {
    throw new Error(response.error as string);
  }

  return response.data as string;
};

/**
 * Get the current status and details for a workflow execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @returns The execution details.
 *
 * @example
 * const execution = await getExecutionStatus(client, executionId);
 * console.log(execution.status);
 */
export const getExecutionStatus = async (
  client: Client,
  executionId: string
): Promise<Execution> => {
  const execution = await AgentsSDK.getExecution({
    client,
    path: { id: executionId },
  });

  if (execution.error) {
    throw new Error(execution.error as string);
  }

  return execution.data as Execution;
};

/**
 * Get the progress updates for an execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @returns Array of progress update objects.
 *
 * @example
 * const progressUpdates = await getWorkflowExecutionProgress(client, executionId);
 * console.log(progressUpdates);
 */
export const getWorkflowExecutionProgress = async (
  client: Client,
  executionId: string
): Promise<Array<{ execution_id: string; progress: string; created_at: string }>> => {
  const progressUpdates = await AgentsSDK.getExecutionProgress({
    client,
    path: { id: executionId },
  });

  if (progressUpdates.error) {
    throw new Error(progressUpdates.error as string);
  }

  return progressUpdates.data as Array<{ execution_id: string; progress: string; created_at: string }>;
};

/**
 * Get the final result of a workflow execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @returns The result object of the execution.
 *
 * @example
 * const result = await getWorkflowResult(client, executionId);
 * console.log(result);
 */
export const getWorkflowResult = async (
  client: Client,
  executionId: string
): Promise<Record<string, unknown>> => {
  const execution = await getExecutionStatus(client, executionId);
  return execution.result;
};

/**
 * Waits for a workflow execution to reach a terminal state and returns the result.
 * Continuously polls the execution status until it's either "completed", "cancelled", or "failed".
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @param interval - Polling interval in milliseconds (default is 1000ms).
 * @returns A promise that resolves with the workflow execution result if completed.
 * @throws An error if the execution ends as "cancelled" or "failed".
 *
 * @example
 * const result = await waitForExecutionResult(client, executionId, 2000);
 */
export const waitForExecutionResult = async (
  client: Client,
  executionId: string,
  interval: number = 1000,
  timeout: number = 3600000 // 1 hour
): Promise<Record<string, unknown>> => {
  var steps = Math.floor(timeout / interval);

  // Keep polling the execution status until it's either "completed", "cancelled", or "failed".
  while (steps > 0) {
    const execution = await getExecutionStatus(client, executionId);
    const currentStatus = execution.status?.status;

    if (currentStatus === 'completed') {
      return await getWorkflowResult(client, executionId);
    } else if (currentStatus === 'failed' || currentStatus === 'cancelled') {
      throw new Error(
        `Execution ${executionId} ended with status: ${currentStatus}${execution.status?.reason ? ' - ' + execution.status.reason : ''
        }`
      );
    }

    // Wait for the specified interval before polling again
    await new Promise(resolve => setTimeout(resolve, interval));
    steps--;
  }

  throw new Error(`Execution ${executionId} timed out after ${timeout}ms`);
};

/**
 * Optionally, re-export all generated functions and types.
 */
export * from './generated/agents/sdk.gen';
export * from './generated/agents/types.gen';
