declare namespace GitHubApi {
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
    fullName: string
    htmlUrl: string.Url
  }
}
