# Contributing to cypress-maildev

Thank you for your interest in contributing to cypress-maildev! This document provides guidelines and instructions to help you get started.

## Table of Contents

- [Contributing to cypress-maildev](#contributing-to-cypress-maildev)
  - [Table of Contents](#table-of-contents)
  - [Code of Conduct](#code-of-conduct)
  - [Getting Started](#getting-started)
    - [Development Setup](#development-setup)
    - [Project Structure](#project-structure)
  - [Development Workflow](#development-workflow)
    - [Making Changes](#making-changes)
    - [Testing](#testing)
    - [Linting](#linting)
  - [Pull Request Process](#pull-request-process)
  - [Release Process](#release-process)

## Code of Conduct

We expect all contributors to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please be respectful and considerate in all interactions.

## Getting Started

### Development Setup

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/cypress-maildev.git
   cd cypress-maildev
   ```

2. **Install dependencies**:
   ```bash
   make install
   ```

3. **Start the development environment**:
   ```bash
   make start
   ```
   This starts the maildev server using Docker.

4. **Stop the development environment** when you're done:
   ```bash
   make stop
   ```

### Project Structure

- `src/`: Source TypeScript files
- `build/`: Compiled JavaScript files
- `cypress/e2e/`: Cypress tests
- `cypress/support/`: Custom Cypress commands and configurations

## Development Workflow

### Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the codebase.

3. Build the project to verify your changes:
   ```bash
   make build
   ```

### Testing

Run the Cypress tests to ensure your changes work correctly:

```bash
make test
```

### Linting

We use Biome for linting. To lint your code:

```bash
make lint
```

To automatically fix linting issues:

```bash
make lint-fix
```

## Pull Request Process

1. Update the README.md or documentation with details of your changes if applicable.
2. Ensure all tests pass and the code lints without errors.
3. Submit your pull request with a clear description of the changes and their purpose.
4. Ensure your PR title follows the [Conventional Commits](https://www.conventionalcommits.org/) format.

## Release Process

The maintainers will handle the release process following these steps:

1. Update version number in package.json
2. Update the CHANGELOG.md
3. Create a new GitHub release with release notes
4. Publish to npm

---

Thank you for contributing to cypress-maildev!
