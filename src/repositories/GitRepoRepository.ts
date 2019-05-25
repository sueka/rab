export default interface GitRepoRepository {
  findSelf(): Promise<Repository>
  find(owner: string, repo: string): Promise<Repository>
}
