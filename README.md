# Agents SDK, TypeScript

This is a TypeScript SDK for the Asteroid Agents API.

## Installation

```bash
npm install asteroid-odyssey
```

## Usage

Below is a minimal example showing how to start an agent workflow, poll for its status until it's completed, and then retrieve its result:

```ts
import { AsteroidAgents } from 'asteroid-sdk';

const asteroid = new AsteroidAgents('YOUR_API_KEY'); // Generate a key at https://platform.asteroid.ai

const workflowID = 'YOUR_WORKFLOW_ID'; // You can create a workflow at https://platform.asteroid.ai or use the .createWorkflow() method

async function runWorkflowExample() {
  try {
    // Start the workflow
    const runID = await asteroid.runWorkflow(workflowID, { name: 'Alice' });
    console.log('Workflow run initiated with ID:', runID);

    // Poll for the workflow status until it completes
    while (true) {
      const status = await asteroid.getRunStatus(runID);
      console.log('Current workflow status:', status);
      if (status === 'completed') break;
      // Wait for 1 second before checking again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Retrieve the result after completion
    const result = await asteroid.getRunResult(runID);
    console.log('Workflow completed. Result:', result);
  } catch (error) {
    console.error('Error executing the workflow:', error);
  }
}

runWorkflowExample();
```

## Development

Regenerate the client SDK from the OpenAPI spec (assuming it's located at `../agents/server/api/openapi.yaml`):

```bash
npm run generate
```
