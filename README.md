# Agents SDK, TypeScript

This is a TypeScript SDK for the Asteroid Agents API.

## Installation

```bash
npm install @asteroid-ai/agents-sdk
```

## Usage

```ts
import { AgentsSDK } from '@asteroid-ai/agents-sdk';

const sdk = new AgentsSDK('astS6bGyn8XxGMnHLELziKU2zCo5Pr2RzMCDCyRFhE3yNNkA4MdPEc58NKZJAeed');
```

## Development

Regenerate the client SDK from the OpenAPI spec (assuming it's located at `../agents/server/api/openapi.yaml`):

```bash
npm run generate
```
