import { parseArgumentsIntoOptions } from './args.js'

export function cli(argv) {
  let options = parseArgumentsIntoOptions(argv);
  if (!options) {
    return
  }
  
  console.log('options:', options)
}