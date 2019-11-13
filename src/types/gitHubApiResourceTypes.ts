namespace GitHubApiResource {
  export type GetRepoResponse = Repository

  export interface UnsuccessfulResponse {
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

  export interface Repository {
    name: string
  }
}
