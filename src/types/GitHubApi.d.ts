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
    full_name: string
    html_url: string.Url
  }
}
