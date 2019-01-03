const axios = require('axios')
const timeout = 20000
let api = null
let repo = null

export const init = ({ baseURL, token, repository }) => {
  const params = { access_token: token }
  repo = repository
  api = axios.create({
    baseURL,
    timeout,
    params
  })
}

export const getPullRequests = ({ max }) => {
  const url = `repos/${repo}/pulls`
  const params = {
    state: 'all',
    per_page: max
  }
  return api.get(url, { params })
}

export const getReviews = ({ number }) => {
  const url = `repos/${repo}/pulls/${number}/reviews`
  const params = {}
  return api.get(url, { params })
}
