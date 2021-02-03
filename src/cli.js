import { v4 as uuidv4 } from 'uuid';
import { parseArgumentsIntoOptions } from './args.js'
import { getEnvOptions } from './env.js'
import { log } from './log.js'
import {
  getAuthorizedBitbucketClient,
  createBranch,
  createPullRequest,
  readRootPackageJson,
  readRoot,
  createSrcFileCommit
} from './bitbucket.js'

export async function cli(argv, env) {  
  try {
    log('Hello Redocly!')

    let options = parseArgumentsIntoOptions(argv);
    if (!options) { return }
    const { repoSlug, workspace, packageName, packageVersion } = options
  
    const envOptions = getEnvOptions(env)
    if (!envOptions) { return }
    const clientOptions = { auth: envOptions.auth }

    // TODO: refactor to lib module, handle auth error
    let bitbucket = getAuthorizedBitbucketClient(clientOptions)

    const commonOptions = {
      bitbucket,
      repoSlug,
      workspace,
    }

    // Read package.json from the root of master branch
    const root = await readRoot(commonOptions)
    const packageJsonPath = 'package.json'
    const packageJson = await readRootPackageJson({ root, path: packageJsonPath })

    log('Original package.json:', packageJson)

    // TODO: decide which deps (dev vs prod) to update
    // TODO: handle no actual changes case (the same package version in original package.json)
    const updatedPackageJson = {
      ...packageJson,
      dependencies: {
        ...packageJson.dependencies,
        [packageName]: packageVersion
      }
    }

    log('Updated packageJson:', updatedPackageJson)

    const newBranch = await createBranch({
      ...commonOptions,
      branchName: `update-package-version-${ uuidv4() }`
    })

    const branchName = newBranch.data.name
    const message = `Update package \`${ packageName }\` version to \`${ packageVersion }\``

    await createSrcFileCommit({
      ...commonOptions,
      branchName,
      message,
      pathToFile: packageJsonPath,
      fileContent: updatedPackageJson
    })

    await createPullRequest({
      ...commonOptions,
      branchName,
      title: message
    })

    log(`Done! Package \`${ packageName }\` version updated to \`${ packageVersion }\``)
  } catch(err) {
    console.dir(err)
  }
}
