import { AgentsSDK } from './AgentsSDK';

// Optionally, you can pass configuration (e.g., a different API base URL)
const sdk = new AgentsSDK('astS6bGyn8XxGMnHLELziKU2zCo5Pr2RzMCDCyRFhE3yNNkA4MdPEc58NKZJAeed', { BASE: 'http://localhost:9090/api/v1' });

async function main() {
  try {
    // Health check
    const health = await sdk.healthCheck();
    console.log('API Health:', health);

    // Get Agents
    const agents = await sdk.getAgents();
    console.log('Agents:', agents);

    // Create a workflow for a specific agent
    const workflowId = await sdk.createWorkflow('my_agent', {
      name: 'My Workflow',
      fields: { promptTemplate: 'Hello {{name}}' },
      prompts: ['Your name is {{name}}, your task is to ...']
    });
    console.log('Created Workflow ID:', workflowId);

    // Execute the workflow
    const execResponse = await sdk.executeWorkflow(workflowId, { name: 'Alice', model: 'gpt-4' });
    console.log('Execution Response:', execResponse);

    // Get all workflow executions
    const executions = await sdk.getWorkflowExecutions();
    console.log('Workflow Executions:', executions);

    // Queue an optimisation job
    // const optimisationResponse = await sdk.queueOptimisationJob({ run_id: '123e4567-e89b-12d3-a456-426614174000' });
    // console.log('Optimisation Job Response:', optimisationResponse);

    // Retrieve the OpenAPI spec (if needed)
    const openApiSchema = await sdk.getOpenApiSchema();
    console.log('OpenAPI Schema:', openApiSchema);
  } catch (error) {
    console.error('Error using the AgentsSDK:', error);
  }
}

main();
