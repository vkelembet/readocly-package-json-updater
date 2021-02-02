import dotenv from 'dotenv'

const getRequiredEnvVars = (env) => {
  if (!env.BITBUCKET_AUTH_USERNAME || !env.BITBUCKET_AUTH_PASSWORD) {
    // TODO: log error
    console.error('Bitbucket creds env vars expected')
    process.exitCode = 1
    return null
  }

  return {
    auth: {
      username: env.BITBUCKET_AUTH_USERNAME,
      password: env.BITBUCKET_AUTH_PASSWORD
    }
  }
}

// Load the .env file if the server isn’t started in production mode
export const getEnvOptions = (env) => {
  console.log('env.NODE_ENV:', env.NODE_ENV)
  if (env.NODE_ENV !== 'production') {
    dotenv.config();
  }

  return getRequiredEnvVars(env)
}