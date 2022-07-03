export type DefSort = { [k: string]: any }
export type DefFilter = { [k: string]: any }

export default function createURLParams(
  limit?: number | string,
  offset?: number,
  sort?: DefSort | null,
  filter?: DefFilter | null,
  extendFilter = true
) {
  const params = new URLSearchParams()
  if (limit) {
    params.append('limit', limit.toString())
  }
  if (offset) {
    params.append('offset', offset.toString())
  }
  if (sort) {
    params.append('sort', JSON.stringify(sort))
  }
  if (filter) {
    if (extendFilter) {
      for (const [key, value] of Object.entries(filter)) {
        const add: any =
          typeof value === 'string' || value instanceof String
            ? value
            : JSON.stringify(value)
        params.append(key, add)
      }
    } else {
      params.append('filter', JSON.stringify(filter))
    }
  }
  return params
}
