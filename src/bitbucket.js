import bitbucketPkg from 'bitbucket'
const { Bitbucket } = bitbucketPkg

export const getAuthorizedBitbucketClient = ({ clientOptions }) => {
  return new Bitbucket(clientOptions)
}

