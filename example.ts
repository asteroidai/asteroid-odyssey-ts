import { AsteroidClient, createNewWorkflow, executeWorkflowById, getExecutionStatus, getWorkflowResult } from './src/index';

(async () => {
  const client = AsteroidClient('YOUR_API_KEY');

  // Create a new workflow for an agent.
  // Note that you don't need to do this every time. You should reuse the same workflow.
  const workflowId = await createNewWorkflow(client, 'iris', {
    name: "Example Workflow",
    result_schema: {},
    fields: {
      start_url: "https://asteroid.ai",
      workflow_name: "Example Workflow 1",
    },
    prompts: ["Your task is to book a demo call with the Asteroid team. Search their website and find the next available demo slot. Book using the email address {{.email}}"],
    provider: "openai"
  });
  console.log("Workflow created:", workflowId);

  // Execute the workflow
  // If you provided any dynamic fields in your prompt, you should pass it in here in the executionData object.
  const executionId = await executeWorkflowById(client, workflowId, { email: "test@test.com" });
  console.log("Workflow execution started:", executionId);

  // Optionally poll for execution status or use getExecutionStatus
  const execution = await getExecutionStatus(client, executionId);
  console.log("Execution status:", execution.status);

  // When done, get the final result
  const result = await getWorkflowResult(client, executionId);
  console.log("Workflow result:", result);
})();
