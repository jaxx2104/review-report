import * as services from './services/index'
import * as github from './api/github'

interface Options {
  baseURL: string
  max: number
}

const defaultOptions: Options = {
  baseURL: 'https://api.github.com/',
  max: 10
}

const warsman = (repository: string, token: string, options: Options) => {
  const { baseURL, max } = Object.assign(defaultOptions, options)
  github.init({ baseURL, token, repository })
  services.reward({ max })
}

export default warsman
