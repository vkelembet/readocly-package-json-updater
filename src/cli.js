import { parseArgumentsIntoOptions } from './args.js'
import { getEnvOptions } from './env.js'
import {
  getAuthorizedBitbucketClient,
  createBranch,
  createPullRequest
} from './bitbucket.js'


export async function cli(argv, env) {
  let options = parseArgumentsIntoOptions(argv);
  if (!options) { return }

  const envOptions = getEnvOptions(env)
  if (!envOptions) { return }

  const clientOptions = {
    auth: envOptions.auth
  }
  
  try {
    let bitbucket = getAuthorizedBitbucketClient(clientOptions)

    await createBranch({
      bitbucket,
      repoSlug: options['repo-slug'],
      workspace: options['repo-workspace'],
      branchName: 'update-package-version'
    })

    // TODO: update package.json with new package version

    await createPullRequest({
      bitbucket,
      repoSlug: options['repo-slug'],
      workspace: options['repo-workspace'],
      branchName: 'update-package-version',
      title: `Update package ${ options['package-name'] } version to ${ options['package-version'] }`
    })
  } catch(err) {
    console.dir(err)
  }
}
