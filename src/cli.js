import { parseArgumentsIntoOptions } from './args.js'
import { getEnvOptions } from './env.js'
import { getAuthorizedBitbucketClient } from './bitbucket.js'

export async function cli(argv, env) {
  let options = parseArgumentsIntoOptions(argv);
  if (!options) { return }

  let bitbucketCreds = getEnvOptions(env)
  if (!bitbucketCreds) { return }
 
  try {
    let bitbucket = getAuthorizedBitbucketClient(bitbucketCreds)

    const { data, headers, status, url } = await bitbucket
      .repositories
      .listGlobal({})
    console.log('repositories:', data)
  } catch(err) {
    const { message, error, headers, request, status } = err
    console.log('error message:', message)
  }

  // TODO: use https://wwww.npmjs.com/package/bitbucket to auth to provided repo
  // TODO: update package.json with new package version
  // TODO: create PR using bitbucket npm
}
