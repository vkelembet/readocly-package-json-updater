import minimist from 'minimist'

const checkArgs = (parsedArgs) => {
  const REQUIRED_PARAMS = Object.freeze([
    'package-name',
    'package-version'
  ])

  // TODO: extract to fn 
  const argsNames = Object.keys(parsedArgs)
  const haveAllRequiredArgs = REQUIRED_PARAMS.every((requiredParam) => {
    return argsNames.includes(requiredParam)
  })

  console.log('argsNames:', argsNames)
  console.log('REQUIRED_PARAMS:', REQUIRED_PARAMS)
  
  if (!haveAllRequiredArgs) {
    // TODO: log error
    console.error('Following args expected:', REQUIRED_PARAMS.join(' '))
    process.exitCode = 1
    return null
  }

  return parsedArgs
}

export const parseArgumentsIntoOptions = (argv) => {
  const parsedArgs = minimist(argv.slice(2))
  const requiredArgs = checkArgs(parsedArgs)
  return requiredArgs
}
