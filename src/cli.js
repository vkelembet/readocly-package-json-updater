import { parseArgumentsIntoOptions } from './args.js'
import { getEnvOptions } from './env.js'

export function cli(argv, env) {
  let options = parseArgumentsIntoOptions(argv);
  if (!options) { return }

  let bitbucketCreds = getEnvOptions(env)
  if (!bitbucketCreds) { return }
}
