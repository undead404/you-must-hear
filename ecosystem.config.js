module.exports = {
  apps: [
    {
      // --- Your NodeJS Proxy Script ---
      name: "discogs-proxy",
      script: "api-proxy/index.js", // The proxy script you just created
      watch: false, // Set to true if you want it to restart on file changes
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
        // This port must match the one in your script
        PORT: 4002,
        TARGET_HOST: "https://api.discogs.com/", // Updated TARGET_HOST for discogs-proxy
      },
    },
    {
      // --- Your NodeJS Proxy Script ---
      name: "lastfm-proxy",
      script: "api-proxy/index.js", // The proxy script you just created
      watch: false, // Set to true if you want it to restart on file changes
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: "production",
        // This port must match the one in your script
        PORT: 4001,
        TARGET_HOST: "https://ws.audioscrobbler.com/2.0/",
      },
    },
    {
      // --- n8n Service ---
      name: "n8n",
      script: "n8n", // Assumes 'n8n' is in your system's PATH
      // args: 'start', // Passes 'start' argument, so PM2 runs 'n8n start'
      instances: 1,
      autorestart: true, // Restart n8n if it crashes
      exec_mode: "fork", // n8n does not support cluster mode
      env: {
        DB_SQLITE_POOL_SIZE: 20,
        DB_SQLITE_VACUUM_ON_STARTUP: true,
        EXECUTIONS_DATA_MAX_AGE: 24,
        EXECUTIONS_DATA_PRUNE_HARD_DELETE_INTERVAL: 5,
        EXECUTIONS_DATA_PRUNE_MAX_COUNT: 10,
        EXECUTIONS_DATA_PRUNE: true,
        EXECUTIONS_DATA_SAVE_MANUAL_EXECUTIONS: false,
        EXECUTIONS_DATA_SAVE_ON_ERROR: "all",
        EXECUTIONS_DATA_SAVE_ON_SUCCESS: "none",
        N8N_BLOCK_ENV_ACCESS_IN_NODE: true,
        N8N_CONCURRENCY_PRODUCTION_LIMIT: 1,
        N8N_GIT_NODE_DISABLE_BARE_REPOS: true,
        N8N_RUNNERS_ENABLED: true,
        NODE_ENV: "production",
        NODE_FUNCTION_ALLOW_EXTERNAL: 'mustache',
        // --- Add your n8n-specific environment variables below ---
        // N8N_HOST: 'localhost',
        // N8N_PORT: 5678,
        // WEBHOOK_URL: 'https://your.n8n.domain.com/',
        // DB_TYPE: 'postgresdb',
        // DB_POSTGRESDB_HOST: 'localhost',
        // DB_POSTGRESDB_PORT: 5432,
        // DB_POSTGRESDB_DATABASE: 'n8n',
        // DB_POSTGRESDB_USER: 'n8n_user',
        // DB_POSTGRESDB_PASSWORD: 'your_password'
      },
    },
  ],
};
