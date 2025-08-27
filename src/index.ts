import { encryptWithPublicKey } from "./utils/encryption";
import * as AgentsV1SDK from "./generated/agents-v1/sdk.gen";
import * as AgentsV2SDK from "./generated/agents-v2/sdk.gen";
import type {
  StructuredAgentExecutionRequest,
  ExecutionStatusResponse,
  BrowserSessionRecordingResponse,
  AgentProfile,
  CreateAgentProfileRequest,
  UpdateAgentProfileRequest,
} from "./generated/agents-v1/types.gen";

import { client as agentsV1Client } from "./generated/agents-v1/client.gen";
import { client as agentsV2Client } from "./generated/agents-v2/client.gen";
import { ExecutionActivity } from "./generated/agents-v2";

/**
 * Create an API client with a provided API key.
 *
 * @param apiKey - Your API key.
 * @returns A configured API client.
 *
 * @example
 * const client = AsteroidClient('your-api-key');
 */
export const AsteroidClient = (
  apiKey: string,
  options?: { v1?: { baseUrl?: string }; v2?: { baseUrl?: string } }
) => {
  agentsV1Client.setConfig({
    headers: {
      "X-Asteroid-Agents-Api-Key": apiKey,
    },
  });
  agentsV2Client.setConfig({
    headers: {
      "X-Asteroid-Agents-Api-Key": apiKey,
    },
  });

  agentsV1Client.setConfig({
    baseUrl: options?.v1?.baseUrl || "https://odyssey.asteroid.ai/api/v1",
  });

  agentsV2Client.setConfig({
    baseUrl: options?.v2?.baseUrl || "https://odyssey.asteroid.ai/agents/v2",
  });

  return { agentsV1Client, agentsV2Client };
};

export type AsteroidClient = ReturnType<typeof AsteroidClient>;

/** --- V1 --- */

/**
 * Execute an agent with parameters including optional agent profile ID.
 *
 * @param client - The API client.
 * @param agentId - The ID of the agent to execute.
 * @param executionData - The structured execution parameters.
 * @returns The execution ID.
 *
 * @example
 * const executionId = await executeAgent(client, 'my-agent-id', {
 *   agent_profile_id: 'profile-123',
 *   dynamic_data: { input: "some dynamic value" }
 * });
 */
export const executeAgent = async (
  client: AsteroidClient,
  agentId: string,
  executionData: StructuredAgentExecutionRequest
): Promise<string> => {
  const response = await AgentsV1SDK.executeAgentStructured({
    client: client.agentsV1Client,
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
  client: AsteroidClient,
  executionId: string
): Promise<ExecutionStatusResponse> => {
  const response = await AgentsV1SDK.getExecutionStatus({
    client: client.agentsV1Client,
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
  client: AsteroidClient,
  executionId: string
): Promise<Record<string, unknown>> => {
  const response = await AgentsV1SDK.getExecutionResult({
    client: client.agentsV1Client,
    path: { id: executionId },
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  if (response.data.error) {
    throw new Error(response.data.error);
  }

  return response.data.execution_result || {};
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
  client: AsteroidClient,
  executionId: string,
  interval: number = 1000,
  timeout: number = 3600000 // 1 hour
): Promise<Record<string, unknown>> => {
  var steps = Math.floor(timeout / interval);

  // Keep polling the execution status until it's either "completed", "cancelled", or "failed".
  while (steps > 0) {
    const status = await getExecutionStatus(client, executionId);
    const currentStatus = status.status;

    if (currentStatus === "completed") {
      return await getExecutionResult(client, executionId);
    } else if (currentStatus === "failed" || currentStatus === "cancelled") {
      throw new Error(
        `Execution ${executionId} ended with status: ${currentStatus}${status.reason ? " - " + status.reason : ""}`
      );
    }

    // Wait for the specified interval before polling again
    await new Promise((resolve) => setTimeout(resolve, interval));
    steps--;
  }

  throw new Error(`Execution ${executionId} timed out after ${timeout}ms`);
};

/**
 * Get the browser session recording URL for a completed execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @returns The browser session recording URL.
 *
 * @example
 * const recording = await getBrowserSessionRecording(client, executionId);
 * console.log(recording.recording_url);
 */
export const getBrowserSessionRecording = async (
  client: AsteroidClient,
  executionId: string
): Promise<BrowserSessionRecordingResponse> => {
  const response = await AgentsV1SDK.getBrowserSessionRecording({
    client: client.agentsV1Client,
    path: { id: executionId },
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data;
};

/**
 * Upload files to an execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @param files - Array of files to upload.
 * @returns The uploaded file IDs and success message.
 *
 * @example
 * const fileInput = document.getElementById('file-input') as HTMLInputElement;
 * const files = Array.from(fileInput.files || []);
 * const result = await uploadExecutionFiles(client, executionId, files);
 * console.log(result.file_ids);
 */
export const uploadExecutionFiles = async (
  client: AsteroidClient,
  executionId: string,
  files: Array<Blob | File>
): Promise<{ message?: string; file_ids?: string[] }> => {
  const response = await AgentsV1SDK.uploadExecutionFiles({
    client: client.agentsV1Client,
    path: { id: executionId },
    body: { files },
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data;
};

/**
 * Get agent profiles for an organization (or all organizations for the user if not specified).
 *
 * @param client - The API client.
 * @param organizationId - Optional organization ID to filter by.
 * @returns []AgentProfile - List of agent profiles.
 *
 * @example
 * const profiles = await getAgentProfiles(client, 'org_123');
 */
export const getAgentProfiles = async (
  client: AsteroidClient,
  organizationId?: string
): Promise<AgentProfile[]> => {
  const response = await AgentsV1SDK.getAgentProfiles({
    client: client.agentsV1Client,
    query: organizationId ? { organization_id: organizationId } : undefined,
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data;
};

/**
 * Get the public key for encrypting credentials.
 *
 * @param client - The API client.
 * @returns The PEM-formatted public key.
 *
 * @example
 * const publicKey = await getCredentialsPublicKey(client);
 */
export const getCredentialsPublicKey = async (
  client: AsteroidClient
): Promise<string> => {
  const response = await AgentsV1SDK.getCredentialsPublicKey({
    client: client.agentsV1Client,
  });

  if (response.error) {
    const errorMessage =
      typeof response.error === "object" && "error" in response.error
        ? (response.error as { error: string }).error
        : typeof response.error === "string"
          ? response.error
          : JSON.stringify(response.error);
    throw new Error(errorMessage || "Unknown error");
  }

  if (!response.data) {
    throw new Error("Public key not found");
  }

  return response.data;
};

/**
 * Create a new agent profile.
 *
 * @param client - The API client.
 * @param payload - The agent profile data.
 * @returns The created agent profile.
 *
 * @example
 * const profile = await createAgentProfile(client, {
 *   name: 'My Profile',
 *   description: 'Profile description',
 *   organization_id: 'org_123',
 *   proxy_cc: 'us',
 *   proxy_type: 'residential',
 *   captcha_solver_active: false,
 *   sticky_ip: false,
 *   credentials: []
 *   cookies: []
 * });
 */
export const createAgentProfile = async (
  client: AsteroidClient,
  payload: CreateAgentProfileRequest
): Promise<AgentProfile> => {
  // If credentials are provided, encrypt them before sending
  let processedPayload = { ...payload };

  if (payload.credentials && payload.credentials.length > 0) {
    // Get the public key for encryption
    const publicKey = await getCredentialsPublicKey(client);

    // Encrypt each credential's data field
    processedPayload.credentials = payload.credentials.map((credential) => ({
      ...credential,
      data: encryptWithPublicKey(credential.data, publicKey),
    }));
  }

  const response = await AgentsV1SDK.createAgentProfile({
    client: client.agentsV1Client,
    body: processedPayload,
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data;
};

/**
 * Get a specific agent profile by ID.
 *
 * @param client - The API client.
 * @param profileId - The agent profile ID.
 * @returns The agent profile.
 *
 * @example
 * const profile = await getAgentProfile(client, 'profile_123');
 */
export const getAgentProfile = async (
  client: AsteroidClient,
  profileId: string
): Promise<AgentProfile> => {
  const response = await AgentsV1SDK.getAgentProfile({
    client: client.agentsV1Client,
    path: { profile_id: profileId },
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data;
};

/**
 * Update an existing agent profile.
 *
 * @param client - The API client.
 * @param profileId - The agent profile ID.
 * @param payload - The update data.
 * @returns The updated agent profile.
 *
 * @example
 * const updated = await updateAgentProfile(client, 'profile_123', {
 *   name: 'New Name',
 *   credentials_to_add: [{ name: 'API_KEY', data: 'secret-key' }],
 *   credentials_to_delete: ['cred_456']
 * });
 */
export const updateAgentProfile = async (
  client: AsteroidClient,
  profileId: string,
  payload: UpdateAgentProfileRequest
): Promise<AgentProfile> => {
  // If credentials_to_add are provided, encrypt them before sending
  let processedPayload = { ...payload };

  if (payload.credentials_to_add && payload.credentials_to_add.length > 0) {
    // Get the public key for encryption
    const publicKey = await getCredentialsPublicKey(client);

    // Encrypt the data field of each credential to add
    processedPayload.credentials_to_add = payload.credentials_to_add.map(
      (credential) => ({
        ...credential,
        data: encryptWithPublicKey(credential.data, publicKey),
      })
    );
  }

  const response = await AgentsV1SDK.updateAgentProfile({
    client: client.agentsV1Client,
    path: { profile_id: profileId },
    body: processedPayload,
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data;
};

/**
 * Delete an agent profile by ID.
 *
 * @param client - The API client.
 * @param profileId - The agent profile ID.
 * @returns A success message.
 *
 * @example
 * await deleteAgentProfile(client, 'profile_123');
 */
export const deleteAgentProfile = async (
  client: AsteroidClient,
  profileId: string
): Promise<{ message?: string }> => {
  const response = await AgentsV1SDK.deleteAgentProfile({
    client: client.agentsV1Client,
    path: { profile_id: profileId },
  });

  if (response.error) {
    throw new Error((response.error as { error: string }).error);
  }

  return response.data;
};

/** --- V2 --- */

/**
 * Get the last N execution activities for a given execution ID, sorted by their timestamp in descending order.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @param n - The number of activities to return.
 * @returns The list of execution activities.
 *
 * @example
 * const activities = await getLastNExecutionActivities(client, 'execution_123', 10);
 * console.log(activities);
 */
export const getLastNExecutionActivities = async (
  client: AsteroidClient,
  executionId: string,
  n: number
): Promise<ExecutionActivity[]> => {
  const response = await AgentsV2SDK.activitiesGet({
    client: client.agentsV2Client,
    path: { executionId },
    query: { limit: n, order: "desc" },
  });

  if (response.error) {
    console.error(response.error);
    throw new Error((response.error as unknown as { error: string }).error);
  }

  return response.data;
};

/**
 * Add a message to an execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @param message - The message to add.
 *
 * @example
 * await addMessageToExecution(client, 'execution_123', 'Hello, world!');
 */
export const addMessageToExecution = async (
  client: AsteroidClient,
  executionId: string,
  message: string
) => {
  const response = await AgentsV2SDK.userMessagesAdd({
    client: client.agentsV2Client,
    path: { executionId },
    body: { message },
  });
  if (response.error) {
    console.error(response.error);
    throw new Error((response.error as unknown as { error: string }).error);
  }
};

/**
 * Optionally, re-export all generated functions and types.
 */
export * as AgentsV1SDK from "./generated/agents-v1/sdk.gen";
export * as AgentsV1Types from "./generated/agents-v1/types.gen";
export * as AgentsV2SDK from "./generated/agents-v2/sdk.gen";
export * as AgentsV2Types from "./generated/agents-v2/types.gen";
