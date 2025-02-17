import {
  ApiService,
  AgentService,
  DefaultService,
  OptimiserService,
  WorkflowService,
  OpenAPI,
} from './asteroid/agents/client-sdk';
import type { Agent } from './asteroid/agents/client-sdk/models/Agent';
import type { CreateWorkflowRequest } from './asteroid/agents/client-sdk/models/CreateWorkflowRequest';
import type { WorkflowExecutionRequest } from './asteroid/agents/client-sdk/models/WorkflowExecutionRequest';
import type { WorkflowExecution } from './asteroid/agents/client-sdk/models/WorkflowExecution';
import type { OptimisationRequest } from './asteroid/agents/client-sdk/models/OptimisationRequest';

/**
 * AgentsSDK provides a simple interface for interacting with the Asteroid Agents API.
 * It wraps the generated client services and exposes high-level methods.
 */
export class AgentsSDK {
  /**
   * Optionally pass a custom OpenAPI config. For instance, to change the API base URL.
   * @param config Partial OpenAPI config values.
   */
  constructor(apiKey: string, config?: Partial<typeof OpenAPI>) {
    // We use a custom header for the API key. Do not use the default header.
    OpenAPI.HEADERS = { 'X-Asteroid-Agents-Api-Key': apiKey };

    if (config) {
      Object.assign(OpenAPI, config);
    }
  }

  /**
   * Retrieves the OpenAPI schema from the API.
   * @returns The OpenAPI specification.
   */
  async getOpenApiSchema(): Promise<any> {
    return ApiService.getOpenApi();
  }

  /**
   * Checks the health of the API.
   * @returns An object containing the health status.
   */
  async healthCheck(): Promise<{ status?: string }> {
    return DefaultService.healthCheck();
  }

  /**
   * Retrieves a list of all agents.
   * @returns An array of agents.
   */
  async getAgents(): Promise<Agent[]> {
    return AgentService.getAgents();
  }

  /**
   * Creates a new workflow for a given agent.
   * @param agentName The name of the agent for which the workflow is created.
   * @param request The workflow creation request.
   * @returns The ID of the newly created workflow.
   */
  async createWorkflow(agentName: string, request: CreateWorkflowRequest): Promise<string> {
    return DefaultService.createWorkflow(agentName, request);
  }

  /**
   * Executes a saved workflow for an agent.
   * @param workflowId The ID of the workflow to execute.
   * @param request The execution request containing dynamic values.
   * @returns A string indicating that the job was queued.
   */
  async executeWorkflow(workflowId: string, request: WorkflowExecutionRequest): Promise<string> {
    return WorkflowService.executeWorkflow(workflowId, request);
  }

  /**
   * Retrieves all workflows along with their executions.
   * @returns An array containing workflow executions.
   */
  async getWorkflowExecutions(): Promise<WorkflowExecution[]> {
    return WorkflowService.getWorkflowExecutions();
  }

  /**
   * Queues an optimisation job for a given run.
   * @param request The optimisation request.
   * @returns A response containing details of the queued job.
   */
  async queueOptimisationJob(request: OptimisationRequest): Promise<any> {
    return OptimiserService.queueOptimisationJob(request);
  }
}
