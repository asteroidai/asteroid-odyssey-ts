import fs from "fs";
import path from "path";

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
import {
  AgentsAgentBase,
  AgentsExecutionActivity,
  AgentsFilesFile,
} from "./generated/agents-v2/types.gen";

/**
 * Centralized error handling utility for API responses.
 * Handles common error patterns and data validation.
 *
 * @param response - The API response object from the generated SDK
 * @param customDataMessage - Custom message for missing data (optional)
 * @returns The response data if valid
 * @throws Error with appropriate message if response contains errors or missing data
 */
const handleApiResponse = <TData>(
  response: { data?: TData; error?: unknown },
  customDataMessage?: string
): TData => {
  if (response.error) {
    // Handle different error formats
    let errorMessage: string;

    if (
      typeof response.error === "object" &&
      response.error !== null &&
      "error" in response.error
    ) {
      errorMessage = (response.error as { error: string }).error;
    } else if (typeof response.error === "string") {
      errorMessage = response.error;
    } else {
      errorMessage = JSON.stringify(response.error);
    }

    throw new Error(errorMessage || "Unknown error");
  }

  if (response.data === undefined) {
    throw new Error(customDataMessage || "No response data received");
  }

  return response.data;
};

/**
 * Generic wrapper for SDK calls that handles both API response errors and network/client errors.
 * This function wraps SDK calls to provide comprehensive error handling.
 *
 * @param sdkCall - The SDK function call that returns a promise with { data?, error? }
 * @param errorContext - Context for error messages (e.g., "get execution files")
 * @param customDataMessage - Custom message for missing data (optional)
 * @returns The response data if valid
 * @throws Error with appropriate message for any type of error
 */
const handleSdkCall = async <TData>(
  sdkCall: () => Promise<{ data?: TData; error?: unknown }>,
  errorContext: string,
  customDataMessage?: string
): Promise<TData> => {
  try {
    const response = await sdkCall();
    return handleApiResponse(response, customDataMessage);
  } catch (error) {
    // Handle network errors, client config errors, or if throwOnError is enabled
    if (error instanceof Error) {
      // If it's already a properly formatted error from handleApiResponse, re-throw it
      if (
        error.message.includes("No response data received") ||
        error.message.startsWith("Failed to")
      ) {
        throw error;
      }
      throw new Error(`Failed to ${errorContext}: ${error.message}`);
    }
    throw new Error(`Failed to ${errorContext}: Unknown error`);
  }
};

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
  const data = await handleSdkCall(
    () =>
      AgentsV1SDK.executeAgentStructured({
        client: client.agentsV1Client,
        path: { id: agentId },
        body: executionData,
      }),
    "execute agent"
  );

  // ExecutionResponse has execution_id: string
  return data.execution_id;
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
  return handleSdkCall(
    () =>
      AgentsV1SDK.getExecutionStatus({
        client: client.agentsV1Client,
        path: { id: executionId },
      }),
    "get execution status"
  );
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
  const data = await handleSdkCall(
    () =>
      AgentsV1SDK.getExecutionResult({
        client: client.agentsV1Client,
        path: { id: executionId },
      }),
    "get execution result"
  );

  // Handle additional error check specific to execution results
  if (data.error) {
    throw new Error(data.error);
  }

  return data.execution_result || {};
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
  return handleSdkCall(
    () =>
      AgentsV1SDK.getBrowserSessionRecording({
        client: client.agentsV1Client,
        path: { id: executionId },
      }),
    "get browser session recording"
  );
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
  files: Array<Blob | globalThis.File>
): Promise<{ message?: string; file_ids?: string[] }> => {
  return handleSdkCall(
    () =>
      AgentsV1SDK.uploadExecutionFiles({
        client: client.agentsV1Client,
        path: { id: executionId },
        body: { files },
      }),
    "upload execution files"
  );
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
  return handleSdkCall(
    () =>
      AgentsV1SDK.getAgentProfiles({
        client: client.agentsV1Client,
        query: organizationId ? { organization_id: organizationId } : undefined,
      }),
    "get agent profiles"
  );
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
  return handleSdkCall(
    () =>
      AgentsV1SDK.getCredentialsPublicKey({
        client: client.agentsV1Client,
      }),
    "get credentials public key",
    "Public key not found"
  );
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

  return handleSdkCall(
    () =>
      AgentsV1SDK.createAgentProfile({
        client: client.agentsV1Client,
        body: processedPayload,
      }),
    "create agent profile"
  );
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
  return handleSdkCall(
    () =>
      AgentsV1SDK.getAgentProfile({
        client: client.agentsV1Client,
        path: { profile_id: profileId },
      }),
    "get agent profile"
  );
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

  return handleSdkCall(
    () =>
      AgentsV1SDK.updateAgentProfile({
        client: client.agentsV1Client,
        path: { profile_id: profileId },
        body: processedPayload,
      }),
    "update agent profile"
  );
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
  return handleSdkCall(
    () =>
      AgentsV1SDK.deleteAgentProfile({
        client: client.agentsV1Client,
        path: { profile_id: profileId },
      }),
    "delete agent profile"
  );
};

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
): Promise<AgentsExecutionActivity[]> => {
  return handleSdkCall(
    () =>
      AgentsV2SDK.executionActivitiesGet({
        client: client.agentsV2Client,
        path: { executionId },
        query: { limit: n, order: "desc" },
      }),
    "get execution activities"
  );
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
  await handleSdkCall(
    () =>
      AgentsV2SDK.executionUserMessagesAdd({
        client: client.agentsV2Client,
        path: { executionId },
        body: { message },
      }),
    "add message to execution"
  );
};

/**
 * Get a list of files associated with an execution.
 *
 * @param client - The API client.
 * @param executionId - The execution identifier.
 * @returns A list of files associated with the execution.
 *
 * @example
 * const files = await getExecutionFiles(client, 'execution_123');
 * files.forEach(file => {
 *   console.log(`File: ${file.fileName}, Size: ${file.fileSize}`);
 * });
 */
export const getExecutionFiles = async (
  client: AsteroidClient,
  executionId: string
): Promise<AgentsFilesFile[]> => {
  return handleSdkCall(
    () =>
      AgentsV2SDK.executionContextFilesGet({
        client: client.agentsV2Client,
        path: { executionId },
      }),
    "get execution files"
  );
};

/**
 * Download a file from an execution using its signed URL.
 *
 * @param client - The API client.
 * @param file - The File object containing the signed URL and metadata.
 * @param downloadPath - Path where the file should be saved. Can be a directory or full file path.
 * @param createDirs - Whether to create parent directories if they don't exist (default: true).
 * @param timeout - Request timeout in seconds (default: 30).
 * @returns The full path where the file was saved.
 *
 * @example
 * const files = await getExecutionFiles(client, 'execution_123');
 * for (const file of files) {
 *   // Download to specific directory
 *   const savedPath = await downloadExecutionFile(client, file, './downloads/');
 *   console.log(`Downloaded ${file.fileName} to ${savedPath}`);
 *
 *   // Download with specific filename
 *   const savedPath2 = await downloadExecutionFile(client, file, './downloads/my_file.txt');
 *   console.log(`Downloaded to ${savedPath2}`);
 * }
 */
export const downloadExecutionFile = async (
  client: AsteroidClient,
  file: AgentsFilesFile,
  downloadPath: string,
  createDirs: boolean = true,
  timeout: number = 30
): Promise<string> => {
  let finalPath: string;

  // Determine the final file path
  if (
    (fs.existsSync(downloadPath) && fs.lstatSync(downloadPath).isDirectory()) ||
    downloadPath.endsWith("/")
  ) {
    // If downloadPath is a directory, use the original filename
    finalPath = path.join(downloadPath, file.fileName);
  } else {
    // If downloadPath includes a filename, use it as-is
    finalPath = downloadPath;
  }

  // Create parent directories if needed
  const parentDir = path.dirname(finalPath);
  if (createDirs && !fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  } else if (!createDirs && !fs.existsSync(parentDir)) {
    throw new Error(`Parent directory does not exist: ${parentDir}`);
  }

  try {
    // Download the file using the signed URL
    const response = await fetch(file.signedUrl, {
      signal: AbortSignal.timeout(timeout * 1000),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Verify content length if available
    const contentLength = response.headers.get("content-length");
    if (contentLength && parseInt(contentLength) !== file.fileSize) {
      throw new Error(
        `Content length mismatch: expected ${file.fileSize}, got ${contentLength}`
      );
    }

    // Get the response as an array buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Final verification of the downloaded file size
    if (buffer.length !== file.fileSize) {
      throw new Error(
        `Downloaded file size mismatch: expected ${file.fileSize}, got ${buffer.length}`
      );
    }

    // Write the file
    fs.writeFileSync(finalPath, buffer);

    return finalPath;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }
    throw new Error("Failed to download file: Unknown error");
  }
};

/** --- V2 --- */

/**
 * Get a paginated list of agents for an organization.
 *
 * @param client - The API client.
 * @param organizationId - The organization identifier.
 * @param page - The page number.
 * @param pageSize - The page size.
 * @returns The list of agents.
 */
export const getAgents = async (
  client: AsteroidClient,
  organizationId: string,
  page: number,
  pageSize: number
): Promise<AgentsAgentBase[]> => {
  const response = await handleSdkCall(
    () =>
      AgentsV2SDK.agentList({
        client: client.agentsV2Client,
        query: { organizationId, page, pageSize },
      }),
    "get agents"
  );

  return response.items;
};

/**
 * Optionally, re-export all generated functions and types.
 */
export * as AgentsV1SDK from "./generated/agents-v1/sdk.gen";
export * as AgentsV1Types from "./generated/agents-v1/types.gen";
export * as AgentsV2SDK from "./generated/agents-v2/sdk.gen";
export * as AgentsV2Types from "./generated/agents-v2/types.gen";
