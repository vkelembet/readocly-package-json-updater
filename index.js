import { cli } from './src/cli.js'

console.log('Hello Readocly!')

cli(process.argv, process.env)

// TODO: use https://www.npmjs.com/package/bitbucket to auth to provided repo
// TODO: update package.json with new package version
// TODO: create PR using bitbucket npm
