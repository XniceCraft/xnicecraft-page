export type Paginate<T> = {
  data: T
  metadata: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
  }
}
