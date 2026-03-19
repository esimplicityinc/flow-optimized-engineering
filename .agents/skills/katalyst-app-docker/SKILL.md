---
name: katalyst-app-docker
description: Use when working with app-docker layers -- Docker container builds, multi-stage images, registry push, Trivy security scanning, environment overlays, and Just recipes.
scope:
  global: false
  layerTypes:
    - app-docker
---

# App Docker Layer Type Reference

The `app-docker` layer type scaffolds Docker-based application containers with a shared base image, per-environment overlays, and Docker Compose for local development. It is the standard Katalyst pattern for containerised applications.

## When to Use This Skill

- Creating, editing, or debugging an `app-docker` layer
- Working with Dockerfiles, Docker Compose, or `.env` files in a layer
- Running actions like `app-docker-build`, `app-docker-push`, or `app-docker-security`
- Understanding the multi-stage build and environment overlay patterns
- Troubleshooting build failures, push errors, or security scan findings

## Directory Structure

```
<layer-name>/
  layer.yaml                    # Taxonomy node definition (layerType: app-docker)
  Justfile                      # Auto-scaffolded (set fallback, LAYER_DIR, STACK_DIR, ENV)
  .dockerignore                 # Files excluded from Docker build context
  .env.example                  # Template for environment variables
  docker-compose.yaml           # Local development orchestration (base)
  README.md                     # Layer documentation
  base/
    Dockerfile                  # Multi-stage build: builder + runtime stages
  <environment>/                # One directory per environment (dev, staging, prod)
    .env                        # Environment-specific variables
    Dockerfile                  # Runtime overlay (FROM base image, sets NODE_ENV)
    docker-compose.override.yaml  # Compose overrides for this environment
    environment.yaml            # Taxonomy environment node definition
```

## Environment Contract

The `app-docker` layer type declares this contract with the environment system:

| Contract Key | Type | Description |
|---|---|---|
| `environment_name` | `templateReplacements` | Injected into Jinja2 templates when scaffolding |

No `layerTemplates` keys are required -- the environment overlay pattern uses directory-based separation rather than template replacement for per-environment configuration.

## Multi-Stage Build Pattern

The `base/Dockerfile` uses a two-stage build:

1. **`builder` stage** -- installs dependencies and builds the application
2. **`runtime` stage** -- minimal image with the built artefact, runs as non-root

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

FROM node:20-alpine AS runtime
RUN addgroup -g 1001 -S appgroup && adduser -u 1001 -S appuser -G appgroup
WORKDIR /app
COPY --from=builder --chown=appuser:appgroup /app .
ENV NODE_ENV=production
EXPOSE 8080
USER appuser
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1
CMD ["node", "index.js"]
```

Key conventions:
- Always run as a **non-root user** (`appuser:appgroup`)
- Include a **HEALTHCHECK** so orchestrators can detect unhealthy containers
- Copy dependency manifests **before** source code for Docker layer caching
- Use `--chown` on COPY to avoid permission issues

## Environment Overlays

Each environment directory contains a thin Dockerfile that extends the base:

```dockerfile
ARG BASE_IMAGE
FROM ${BASE_IMAGE:-<layer-name>:base}
ENV NODE_ENV=<environment>
```

Plus a `.env` file and a `docker-compose.override.yaml` for Compose-based local development:

```bash
# Run with a specific environment overlay
docker compose -f docker-compose.yaml -f dev/docker-compose.override.yaml up
```

Create a new environment by copying `env-template/` and renaming it:

```bash
cp -r env-template/ staging
# Edit staging/.env, staging/Dockerfile, staging/environment.yaml
```

## Available Actions

| Action | Stage | Recipe | Timeout | Description |
|--------|-------|--------|---------|-------------|
| `app-docker-build` | `pre` | `just app-docker-build` | 1200s | Build base and runtime Docker images |
| `app-docker-push` | `main` | `just app-docker-push` | 600s | Push images to configured container registry |
| `app-docker-load` | `main` | `just app-docker-load` | 300s | Load images into a local kind cluster |
| `app-docker-security` | `post` | `just app-docker-security` | 300s | Scan images with Trivy for vulnerabilities |

### Typical CI/CD Flow

```
pre:  app-docker-build   (build the images)
main: app-docker-push    (push to ECR/GHCR)
post: app-docker-security (Trivy scan)
```

For local development (kind cluster):

```
pre:  app-docker-build
main: app-docker-load    (load into kind instead of push)
```

## Just Recipes

All recipes are defined in `.global/taxonomy/actions/just/layerTypes/app-docker.just` and run via the two-tier Justfile fallback mechanism.

Key variables consumed by the recipes:

| Variable | Source | Description |
|----------|--------|-------------|
| `LAYER_DIR` | Layer `Justfile` | Absolute path to the layer directory |
| `STACK_DIR` | Layer `Justfile` | Parent stack directory |
| `ENV` | First `*/environment.yaml` or `"dev"` | Active environment name |

Run actions from inside the layer directory:

```bash
cd <layer-dir>
just app-docker-build        # Build images
just app-docker-push         # Push to registry
just app-docker-security     # Run Trivy scan
```

Or via the CLI:

```bash
kata tax action run app-docker-build --layer <fqtn> --env dev
```

## Docker Compose for Local Development

The `docker-compose.yaml` in the layer root provides a ready-to-use local environment:

```bash
docker compose up              # Start with defaults
docker compose up --build      # Rebuild and start
docker compose down            # Stop and remove containers
```

To use environment-specific overrides:

```bash
docker compose -f docker-compose.yaml -f dev/docker-compose.override.yaml up
```

## Security Scanning

The `app-docker-security` action runs **Trivy** against the built images:

- Scans for OS package and application dependency vulnerabilities
- Timeout: 300 seconds
- Runs as a `post` stage action (after build/push)
- Results are printed to stdout; configure severity thresholds in your CI pipeline

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| Build timeout (>1200s) | Large image or slow network for base image pull | Use a smaller base image, add `.dockerignore` entries, leverage build cache |
| Push auth failure | Missing registry credentials | Run `aws ecr get-login-password` or `echo $GHCR_TOKEN | docker login ghcr.io` |
| Load fails (kind) | kind cluster not running or wrong context | Run `kind get clusters` and `kubectl config use-context kind-<name>` |
| Trivy scan failures | Critical/High CVEs detected | Update base images, patch dependencies, or add `.trivyignore` for accepted risks |
| Permission denied at runtime | Container running as root | Ensure `USER appuser` is set after `COPY --chown` |
| HEALTHCHECK failing | Wrong port or path | Check `EXPOSE` port matches the app's listen port and `/health` endpoint exists |
| Hot reload not working | Volume mount path mismatch | Verify `docker-compose.yaml` volumes match your app's source directory |
| `.env` not loaded | Missing `env_file` directive | Ensure `docker-compose.yaml` includes `env_file: [.env]` |
