const axios = require('axios').default
import * as I from '../interface/reviews'

const timeout = 20000
let repo: string
let api: {
  create: Function
  get: Function
}

interface InitOptions {
  baseURL: string
  token: string
  repository: string
}

interface Requests {
  max: number
}

interface Reviews {
  number: number
}
/**
 * Inittialize
 * @param options
 */
export const init = (options: InitOptions): void => {
  const { baseURL, token, repository } = options
  const params = { access_token: token }
  repo = repository
  api = axios.create({
    baseURL,
    timeout,
    params
  })
}

/**
 * Request PullRequests
 * @param options
 */
export const getPullRequests = (options: Requests): Promise<I.Reviews> => {
  const { max } = options
  const url = `repos/${repo}/pulls`
  const params = {
    state: 'all',
    per_page: max
  }
  return api.get(url, { params })
}

/**
 * Request Reviews
 * @param options
 */
export const getReviews = (options: Reviews): Promise<I.Reviews> => {
  const { number } = options
  const url = `repos/${repo}/pulls/${number}/reviews`
  const params = {}
  return api.get(url, { params })
}
