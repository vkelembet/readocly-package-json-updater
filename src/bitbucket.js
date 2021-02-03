import bitbucketPkg from 'bitbucket'
const { Bitbucket } = bitbucketPkg
import fetch from 'node-fetch'
import FormData from 'form-data'

export const getAuthorizedBitbucketClient = (clientOptions) => {
  return new Bitbucket(clientOptions)
}

export const getRepo = async ({ bitbucket, repoSlug, workspace, fields }) => {
  const endpointOptions = {
    repo_slug: repoSlug,
    workspace,
    fields
  }

  return await bitbucket.repositories.get(endpointOptions)
}

export const readRoot = async ({ bitbucket, repoSlug, workspace }) => {
  const endpointOptions = {
    repo_slug: repoSlug,
    workspace
  }

  return await bitbucket.source.readRoot(endpointOptions)
}

export const createPullRequest = async ({ bitbucket, repoSlug, workspace, title, branchName }) => {
  const endpointOptions = { 
    _body: {
      title,
      source: {
        branch: {
          name: branchName
        }
      }
    },
    repo_slug: repoSlug,
    workspace
  }
  
  return await bitbucket.pullrequests.create(endpointOptions)
}

// https://bitbucketjs.netlify.app/#api-repositories-repositories_createSrcFileCommit
export const createSrcFileCommit = async ({ bitbucket, repoSlug, workspace, branchName, pathToFile, fileContent }) => {
  const form = new FormData();
  form.append(pathToFile, JSON.stringify(fileContent, null, 2));

  const endpointOptions = {
    _body: form,
    repo_slug: repoSlug,
    workspace,
    branch: branchName
  }

  return await bitbucket.repositories.createSrcFileCommit(endpointOptions)
}

export const createBranch = async ({ bitbucket, repoSlug, workspace, branchName }) => {
  const endpointOptions = { 
    _body: {
      name: branchName,
      target: {
        hash: 'master'
      }
    },
    repo_slug: repoSlug,
    workspace
  }

  return await bitbucket.refs.createBranch(endpointOptions)
}

export const fetchFile = async ({ url }) => {
  const response = await fetch(url)
  return await response.json()
}

export const readRootPackageJson = async ({ root, path }) => {
  const packageJsonValue = root.data.values.find(value => value.escaped_path === path)
  // TODO: handle no package.json file case

  // TODO: check if fetch works with private repos (creds?)
  const packageJsonHref = packageJsonValue.links.self.href
  const packageJson = await fetchFile({
    url: packageJsonHref
  })

  return packageJson
}
