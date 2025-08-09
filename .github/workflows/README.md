# GitHub Actions Workflows

## Publish to NPM

The `publish.yml` workflow automatically publishes the TypeScript SDK to NPM when a new tag is pushed to the repository.

### Setup

1. **NPM Token**: You need to add your NPM automation token as a repository secret:
   - Go to your repository settings on GitHub
   - Navigate to "Secrets and variables" → "Actions"
   - Click "New repository secret"
   - Name: `NPM_TOKEN`
   - Value: Your NPM automation token (get it from https://www.npmjs.com/settings/YOUR_USERNAME/tokens)
   - Make sure to create a token with "Automation" type for CI/CD workflows

### Usage

1. **Update version in package.json**:
   ```bash
   # Update the version field in package.json to match your intended release
   # For example: "version": "v1.2.2"
   ```

2. **Commit your changes**:
   ```bash
   git add package.json
   git commit -m "Bump version to v1.2.2"
   git push
   ```

3. **Create and push a tag**:
   ```bash
   # Tag must match the version in package.json
   git tag v1.2.2
   git push origin v1.2.2
   ```

The workflow will automatically:
- Trigger when the tag is pushed
- Verify that the git tag matches the version in package.json
- Install dependencies using pnpm
- Build the TypeScript project
- Publish to NPM using the provided token

### Workflow Features

- **Version Validation**: Ensures the git tag matches the package.json version
- **Caching**: Uses pnpm store caching for faster builds
- **Node.js 20**: Uses the latest LTS version of Node.js
- **Automated Publishing**: No manual OTP entry required

### Troubleshooting

- If the workflow fails with "Package version does not match git tag", ensure your package.json version field exactly matches the git tag you're pushing
- If NPM publish fails, check that your NPM_TOKEN secret is correctly set and has the necessary permissions
- The workflow uses `pnpm publish --no-git-checks` to avoid issues with git state during CI
