import bitbucketPkg from 'bitbucket'
const { Bitbucket } = bitbucketPkg

export const getAuthorizedBitbucketClient = (clientOptions) => {
  return new Bitbucket(clientOptions)
}

export const getRepo = async ({ bitbucket, repoSlug, workspace, fields }) => {
  return await bitbucket.repositories.get({
    repo_slug: repoSlug,
    workspace,
    fields
  })
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

export const getUserPermissions = async ({ bitbucket, username }) => {
  return await bitbucket.teams.listPermissions({
    username
  })
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
