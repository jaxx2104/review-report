const _ = require('lodash')
import * as I from '../interface/reviews'
import { getPullRequests, getReviews } from '../api/github'

let revieweeList: string[]

/**
 * Get reviews from multiple PullRequests
 * @param results
 */
const getMultiReviews = (results: I.Review[]): Promise<I.Review[][]> => {
  const pullRequests = results || []
  revieweeList = pullRequests.map(({ user }) => user.login)
  return Promise.all(
    pullRequests.map(({ number }) => {
      return getReviews({ number })
    })
  )
}

/**
 * Filter reviews
 * @param reviewsList
 */
const filterReviews = (reviews: I.Review[][]): I.FormatReview[] => {
  let reports: I.FormatReview[] = []
  reviews.forEach((result, i: number) => {
    // Remap reviews
    const reviews = (result || []).map(review => {
      const user = review.user.login
      const state = review.state
      const date = review.submitted_at
      return { user, state, date }
    })
    // Filter self-reviews
    const reviewee = revieweeList[i]
    const report = reviews.filter(({ user }) => {
      return user !== reviewee
    })
    reports = reports.concat(report)
  })
  return reports
}

/**
 * Format reviews
 * @param reports
 */
const formatReviews = (reviews: I.FormatReview[]): I.Table[] =>
  _(reviews)
    .groupBy('user')
    .map((groupReport, user) => {
      const count = groupReport.length
      return { user, count }
    })
    .orderBy('count', 'desc')
    .value()

/**
 * Run
 */
export const reward = async (options: { max: number }) => {
  const { max } = options
  try {
    const p = await getPullRequests({ max })
    const r = await getMultiReviews(p)
    const filter = await filterReviews(r)
    const format = await formatReviews(filter)
    return format
  } catch (e) {
    console.error(e.message)
    process.exit(1)
  }
}
