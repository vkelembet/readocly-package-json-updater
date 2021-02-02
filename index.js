import { cli } from './src/cli.js'

console.log('Hello Readocly!')

// TODO: accept params using something like minimist or yargs: package name, version, repository to update
cli(process.argv)

// TODO: use https://www.npmjs.com/package/bitbucket to auth to provided repo
// TODO: update package.json with new package version
// TODO: create PR using bitbucket npm
