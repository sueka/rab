declare namespace GitHubApiResource {
  type GetRepoResponse = Repository

  interface UnsuccessfulResponse {
    message: string
    documentation_url?: string
  }

  //
  // _|_|_|    _|_|_|_|_|    _|_|
  // _|    _|      _|      _|    _|    _|_|_|
  // _|    _|      _|      _|    _|  _|_|
  // _|    _|      _|      _|    _|      _|_|
  // _|_|_|        _|        _|_|    _|_|_|
  //
  //

  interface Repository {
    name: string
  }
}
