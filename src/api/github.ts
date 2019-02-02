const fetch = require('node-fetch')
const qs = require('querystring')
import * as I from '../interface/reviews'

const config = {
  repository: '',
  baseURL: '',
  timeout: 20000,
  baseParams: { access_token: '' }
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
  config.baseParams = { access_token: token }
  config.baseURL = baseURL
  config.repository = repository
}

/**
 * Request PullRequests
 * @param options
 */
export const getPullRequests = (options: Requests): Promise<I.Review[]> => {
  const { max } = options
  const { baseURL, repository, baseParams } = config
  const url = `${baseURL}repos/${repository}/pulls`
  const params = {
    ...baseParams,
    ...{
      state: 'all',
      per_page: max
    }
  }
  return fetch(`${url}?${qs.stringify(params)}`).then(
    (res: { json: Function }) => res.json()
  )
}

/**
 * Request Reviews
 * @param options
 */
export const getReviews = (options: Reviews): Promise<I.Review[]> => {
  const { number } = options
  const { baseURL, repository, baseParams } = config
  const url = `${baseURL}repos/${repository}/pulls/${number}/reviews`
  const params = {
    ...baseParams,
    ...{}
  }
  return fetch(`${url}?${qs.stringify(params)}`).then(
    (res: { json: Function }) => res.json()
  )
}
