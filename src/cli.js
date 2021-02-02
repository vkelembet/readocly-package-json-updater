import { parseArgumentsIntoOptions } from './args.js'
import { getEnvOptions } from './env.js'
import { getAuthorizedBitbucketClient, getRepo } from './bitbucket.js'

export async function cli(argv, env) {
  let options = parseArgumentsIntoOptions(argv);
  if (!options) { return }
  console.log('Options:')
  console.dir(options)

  let bitbucketCreds = getEnvOptions(env)
  if (!bitbucketCreds) { return }
 
  try {
    let bitbucket = getAuthorizedBitbucketClient(bitbucketCreds)

    let repo = await getRepo({
      bitbucket,
      repoSlug: options['repo-slug'],
      workspace: options['repo-workspace']
    })

    console.log('Repo info:')
    console.dir(repo)
  } catch(err) {
    const { message, error, headers, request, status } = err
    console.log('error message:', message)
  }

  // TODO: use https://wwww.npmjs.com/package/bitbucket to auth to provided repo
  // TODO: update package.json with new package version
  // TODO: create PR using bitbucket npm
}
