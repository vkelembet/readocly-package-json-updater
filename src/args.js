import minimist from 'minimist'

const getRequiredArgs = (parsedArgs) => {
  const REQUIRED_PARAMS = Object.freeze([
    'package-name',
    'package-version',
    'repo-slug',
    'repo-workspace'
  ])

  const argsNames = Object.keys(parsedArgs)
  const haveAllRequiredArgs = REQUIRED_PARAMS.every((requiredParam) => {
    return argsNames.includes(requiredParam)
  })
  
  if (!haveAllRequiredArgs) {
    console.error('Following args expected:', REQUIRED_PARAMS.join(' '))
    process.exitCode = 1
    return null
  }

  return parsedArgs
}

export const parseArgumentsIntoOptions = (argv) => {
  const parsedArgs = minimist(argv.slice(2))
  const requiredArgs = getRequiredArgs(parsedArgs)
  if (!requiredArgs) {
    return 
  }

  return {
    repoSlug: requiredArgs['repo-slug'],
    workspace: requiredArgs['repo-workspace'],
    packageName: requiredArgs['package-name'],
    packageVersion: requiredArgs['package-version'],
  }
}
