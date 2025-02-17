import { AsteroidAgents } from './AgentsSDK';

const asteroid = new AsteroidAgents('astahQigcDcuTs1o6JdRE9TYFBqix5HdG9rN3xLeKmJ0sPVgsHBjytzuhn2oJaW1', { BASE: 'http://localhost:9090/api/v1' });

const workflowID = '96c3a1b1-1ee1-430e-838a-2b8cbdf082da';

async function main() {
  try {
    // Execute the workflow
    const runID = await asteroid.executeWorkflow(
      workflowID,
      { name: 'Alice' }
    );

    console.log('Run ID:', runID);

  } catch (error) {
    console.error('Error using the AgentsSDK:', error);
  }
}

main();
