console.log('Hello Readocly!')

import minimist from 'minimist'
const argv = minimist(process.argv.slice(2))
console.log(argv)

// TODO: accept params using something like minimist or yargs: package name, version, repository to update
// TODO: use https://www.npmjs.com/package/bitbucket to auth to provided repo
// TODO: update package.json with new package version
// TODO: create PR using bitbucket npm
