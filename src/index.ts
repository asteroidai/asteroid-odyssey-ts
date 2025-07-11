import { createClient } from '@hey-api/client-fetch';
import * as AgentsSDK from './generated/agents/sdk.gen';
import type { Client } from '@hey-api/client-fetch';
import type {
  AgentExecutionRequest,
  ExecutionStatusResponse,
  ExecutionResultResponse
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
export const AsteroidClient = (apiKey: string, options?: { baseUrl?: string }): Client => {
  return createClient({
    baseUrl: options?.baseUrl || 'https://odyssey.asteroid.ai/api/v1',
    headers: {
      'X-Asteroid-Agents-Api-Key': apiKey
    }
  });
};

/**
 * Execute an agent with the provided parameters.
 *
 * @param client - The API client.
 * @param agentId - The ID of the agent to execute.
 * @param executionData - The execution parameters.
 * @returns The execution ID.
 *
 * @example
 * const executionId = await executeAgent(client, 'my-agent-id', { input: "some dynamic value" });
 */
export const executeAgent = async (
  client: Client,
  agentId: string,
  executionData: AgentExecutionRequest
): Promise<string> => {
  const response = await AgentsSDK.executeAgent({
    client,
    path: { id: agentId },
    body: executionData,
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data.execution_id;
};

/**
 * Get the current status for an execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @returns The execution status details.
 *
 * @example
 * const status = await getExecutionStatus(client, executionId);
 * console.log(status.status);
 */
export const getExecutionStatus = async (
  client: Client,
  executionId: string
): Promise<ExecutionStatusResponse> => {
  const response = await AgentsSDK.getExecutionStatus({
    client,
    path: { id: executionId },
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data;
};

/**
 * Get the final result of an execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @returns The result object of the execution.
 *
 * @example
 * const result = await getExecutionResult(client, executionId);
 * console.log(result);
 */
export const getExecutionResult = async (
  client: Client,
  executionId: string
): Promise<Record<string, unknown>> => {
  const response = await AgentsSDK.getExecutionResult({
    client,
    path: { id: executionId },
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data.result || {};
};

/**
 * Waits for an execution to reach a terminal state and returns the result.
 * Continuously polls the execution status until it's either "completed", "cancelled", or "failed".
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @param interval - Polling interval in milliseconds (default is 1000ms).
 * @returns A promise that resolves with the execution result if completed.
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
    const status = await getExecutionStatus(client, executionId);
    const currentStatus = status.status;

    if (currentStatus === 'completed') {
      return await getExecutionResult(client, executionId);
    } else if (currentStatus === 'failed' || currentStatus === 'cancelled') {
      throw new Error(
        `Execution ${executionId} ended with status: ${currentStatus}${status.reason ? ' - ' + status.reason : ''}`
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
