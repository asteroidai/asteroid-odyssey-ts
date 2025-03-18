import { AsteroidClient, createNewWorkflow, executeWorkflowById, waitForExecutionResult } from './src/index';

(async () => {
  const client = AsteroidClient('YOUR_API_KEY');

  // Create a new workflow for an agent.
  // Note that you don't need to do this every time. You should reuse the same workflow.
  const workflowId = await createNewWorkflow(client, 'iris', {
    name: "Example Workflow 22",
    result_schema: {},
    fields: {
      start_url: "https://google.com",
    },
    prompts: ["Go to the K8s GitHub repo and find the commit message of the 10th most recent commit."],
    provider: "openai"
  });

  console.log("View it at https://platform.asteroid.ai/workflows/" + workflowId);

  // Execute the workflow
  // If you provided any dynamic fields in your prompt, you should pass it in here in the executionData object.
  const executionId = await executeWorkflowById(client, workflowId, { email: "test@test.com" });
  console.log("Workflow execution started:", "https://platform.asteroid.ai/executions/" + executionId);

  // Wait for execution to complete and get the result (or fail).
  try {
    const result = await waitForExecutionResult(client, executionId, 2000);
    console.log("Workflow result:", result);
  } catch (err) {
    console.log("Workflow ended with an error:", err);
  }
})();
