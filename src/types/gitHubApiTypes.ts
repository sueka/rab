declare namespace GitHubApi {
  type GetRepoResponse = Repository

  interface UnsuccessfulResponse {
    message: string
    documentationUrl?: string
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
