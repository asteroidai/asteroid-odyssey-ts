import { AsteroidAgents } from '../src';

const asteroid = new AsteroidAgents(
  'astahQigcDcuTs1o6JdRE9TYFBqix5HdG9rN3xLeKmJ0sPVgsHBjytzuhn2oJaW1',
  { BASE: 'http://localhost:9090/api/v1' },
  { BASE: 'http://localhost:8080/api/v1' }
);

const workflowID = '96c3a1b1-1ee1-430e-838a-2b8cbdf082da';

async function main() {
  try {
    // Execute the workflow
    const runID = await asteroid.runWorkflow(
      workflowID,
      { name: 'Alice' }
    );

    console.log('Run ID:', runID);

    // Get the status of the run
    for (let i = 0; i < 1000; i++) {
      try {
        const status = await asteroid.getRunStatus(runID);
        console.log('Run status:', status);
        if (status === 'completed') {
          break;
        }
      } catch (error) {
        console.error('Error getting run status:', error);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Get the result of the run
    const result = await asteroid.getRunResult(runID);
    console.log('Run result:', result);

  } catch (error) {
    console.error('Error using the AgentsSDK:', error);
  }
}

main();
