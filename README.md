# restart-iam-service

Authentication & authorization (IAM) microservice of the **Restart** platform. Handles user identity, access control and token management for the other Restart services.

## Tech Stack

Node.js + Express, SQL schema managed via `schema` and datasource modules.

## Related repositories

[restart-marketplace-service](https://github.com/Emrullah10/restart-marketplace-service) · [restart-operation-service](https://github.com/Emrullah10/restart-operation-service) · [restart_react_app](https://github.com/Emrullah10/restart_react_app) (React Native client) · [restart_app_flutter](https://github.com/Emrullah10/restart_app_flutter) (Flutter client)

## Getting started

```bash
npm install
npm start
```

Copy `.env.example` to `.env` and fill in your local configuration before running.
