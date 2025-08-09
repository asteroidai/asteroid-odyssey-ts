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

1. Merge your feature branch into the default branch (e.g. `main`).
2. Pull the latest on your local default branch:
   ```bash
   git checkout $(git symbolic-ref --short refs/remotes/origin/HEAD | sed 's@^origin/@@')
   git pull
   ```
3. Create and push a tag that follows semver with a leading `v`:

   With `tagbump` simply run `tagbump`.

   Or, to do it manually:

   ```bash
   # Stable release
   git tag v1.2.2
   git push origin v1.2.2

   # Pre-release (will publish with dist-tag 'next')
   git tag v1.3.0-beta.1
   git push origin v1.3.0-beta.1
   ```

The workflow will automatically:

- Trigger when the tag is pushed
- Derive the package.json version from the tag (no need to pre-bump in branches)
- Install dependencies using pnpm
- Build the TypeScript project
- Publish to NPM using the provided token and appropriate dist-tag (`latest` or `next`)

### Workflow Features

- **Tag-Driven Versioning**: Uses the git tag to set `package.json` version during CI
- **Caching**: Uses pnpm store caching for faster builds
- **Node.js 20**: Uses the latest LTS version of Node.js
- **Automated Publishing**: No manual OTP entry required

### Troubleshooting

- If the workflow fails with a tag validation error, ensure your tag matches `vMAJOR.MINOR.PATCH` (optionally with a pre-release suffix like `-beta.1`)
- If NPM publish fails, check that your NPM_TOKEN secret is correctly set and has the necessary permissions
- The workflow uses `pnpm publish --no-git-checks` to avoid issues with git state during CI
