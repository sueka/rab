import { Octokit } from '@octokit/core'

import fetchStub from '~/infrastructure/double/fetchStub'

const octokitStub = new Octokit({
  request: {
    fetch: fetchStub,
  },
})

export default octokitStub
