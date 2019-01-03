import getReviews from './services/getReviews'
import { init } from './api/github'

const warsman = ({
  baseURL = 'https://api.github.com/',
  repository,
  token,
  max = 10
}) => {
  init({ baseURL, token, repository })
  return getReviews({ max })
}

export default warsman
