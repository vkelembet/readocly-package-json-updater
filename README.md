# redocly-package-json-updater

A node script that updates `package.json` in BitBucket repo and opens a pull request.

## Usage

```
npm start -- --package-name=package --package-version=^1.2.5 --repo-workspace=bitbucket-user --repo-slug=bitbucket-repository-name
```

Provide BitBucket credentials via environment variables for production, or in `.env` file for development.

```
BITBUCKET_AUTH_USERNAME=bitbucket-user
BITBUCKET_AUTH_PASSWORD=bitbucket-password
```
