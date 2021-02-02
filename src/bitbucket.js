import bitbucketPkg from 'bitbucket'
const { Bitbucket } = bitbucketPkg

export const getAuthorizedBitbucketClient = ({ clientOptions }) => {
  return new Bitbucket(clientOptions)
}

export const getRepo = async ({ bitbucket, repoSlug, workspace, fields }) => {
  return await bitbucket.repositories.get({
    repo_slug: repoSlug,
    workspace,
    fields
  })
}
