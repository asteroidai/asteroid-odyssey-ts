import {
  AgentService as AgentsAgentService,
  ApiService as AgentsApiService,
  DefaultService as AgentsDefaultService,
  OpenAPI as AgentsOpenAPI,
  WorkflowService as AgentsWorkflowService
} from './generated/agents';
import {
  ImproveService as PlatformImproveService,
  OpenAPI as PlatformOpenAPI,
  RunService as PlatformRunService
} from './generated/platform';
import type {Agent} from './generated/agents/models/Agent';
import type {CreateWorkflowRequest} from './generated/agents/models/CreateWorkflowRequest';
import type {WorkflowExecutionRequest} from './generated/agents/models/WorkflowExecutionRequest';
import type {WorkflowExecution} from './generated/agents/models/WorkflowExecution';
import type {Status} from './generated/platform/models/Status';
import type {FeedbackRequest} from './generated/platform/models/FeedbackRequest';
import type {Feedback} from './generated/platform/models/Feedback';

/**
 * AgentsSDK provides a simple interface for interacting with the Asteroid Agents API.
 * It wraps the generated client services and exposes high-level methods.
 */
export class AsteroidAgents {
  /**
   * Optionally pass a custom OpenAPI config. For instance, to change the API base URL.
   * @param config Partial OpenAPI config values.
   */
  constructor(apiKey: string, agentsConfig?: Partial<typeof AgentsOpenAPI>, platformConfig?: Partial<typeof PlatformOpenAPI>) {
    // We use a custom headers for the API keys
    PlatformOpenAPI.HEADERS = { 'X-Asteroid-Api-Key': apiKey };
    AgentsOpenAPI.HEADERS = { 'X-Asteroid-Agents-Api-Key': apiKey };
    AgentsOpenAPI.BASE = 'https://odyssey.asteroid.ai/api/v1';
    PlatformOpenAPI.BASE = 'https://platform.asteroid.ai/api/v1';

    if (agentsConfig) {
      Object.assign(AgentsOpenAPI, agentsConfig);
    }
    if (platformConfig) {
      Object.assign(PlatformOpenAPI, platformConfig);
    }
  }

  /**
   * Retrieves the OpenAPI schema from the API.
   * @returns The OpenAPI specification.
   */
  async getOpenApiSchema(): Promise<any> {
    return AgentsApiService.getOpenApi();
  }

  /**
   * Checks the health of the API.
   * @returns An object containing the health status.
   */
  async healthCheck(): Promise<{ status?: string }> {
    return AgentsDefaultService.healthCheck();
  }

  /**
   * Retrieves a list of all agents.
   * @returns An array of agents.
   */
  async getAgents(): Promise<Agent[]> {
    return AgentsAgentService.getAgents();
  }

  /**
   * Creates a new workflow for a given agent.
   * @param agentName The name of the agent for which the workflow is created.
   * @param request The workflow creation request.
   * @returns The ID of the newly created workflow.
   */
  async createWorkflow(agentName: string, request: CreateWorkflowRequest): Promise<string> {
    return AgentsDefaultService.createWorkflow(agentName, request);
  }

  /**
   * Executes a saved workflow for an agent.
   * @param workflowId The ID of the workflow to execute.
   * @param request The execution request containing dynamic values.
   * @returns A string indicating that the job was queued.
   */
  async runWorkflow(workflowId: string, request: WorkflowExecutionRequest): Promise<string> {
    return AgentsWorkflowService.executeWorkflow(workflowId, request);
  }

  /**
   * Retrieves all workflows along with their executions.
   * @returns An array containing workflow executions.
   */
  async getWorkflowRuns(): Promise<WorkflowExecution[]> {
    return AgentsWorkflowService.getWorkflowExecutions();
  }

  /**
   * Retrieves the status of a run.
   * @param runId The ID of the run to retrieve the status for.
   * @returns The status of the run.
   */
  async getRunStatus(runId: string): Promise<Status> {
    return PlatformRunService.getRunStatus(runId);
  }

  async getRunResult(runId: string): Promise<string> {
    const run = await PlatformRunService.getRun(runId);
    const metadata = run.metadata;
    if (!metadata) {
      throw new Error('Run metadata not found');
    }
    const result = metadata.final_result;
    if (!result) {
      throw new Error('Run result not found');
    }
    return result;
  }

  /**
   * Creates feedback for a run.
   * @param runId The ID of the run to create feedback for.
   * @param request The feedback request.
   * @returns The feedback created.
   */
  async createRunFeedback(runId: string, request: FeedbackRequest): Promise<Feedback> {
    return PlatformImproveService.createFeedback(runId, request);
  }
}
