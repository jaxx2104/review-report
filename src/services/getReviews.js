import _ from 'lodash'
import { getPullRequests, getReviews } from '../api/github'
let revieweeList = []

const getAllReviews = results => {
  const pullRequests = results.data || []
  const promiseList = pullRequests.map(pullRequest => {
    return getReviews({ number: pullRequest.number })
  })
  revieweeList = pullRequests.map(({ user }) => user.login)
  return Promise.all(promiseList)
}

const pickReviews = reviews => {
  const formatReviews = []
  reviews.forEach(review => {
    const user = review.user.login
    const state = review.state
    const date = review.submitted_at
    formatReviews.push({ user, state, date })
  })
  return formatReviews
}

const filterReviews = reviewsList => {
  let reports = []
  reviewsList.forEach((result, i) => {
    const reviewee = revieweeList[i]
    let reviews = result.data || []
    reviews = pickReviews(reviews)
    reviews = reviews.filter(review => {
      return review.user !== reviewee
    })
    reports = reports.concat(reviews)
  })
  return reports
}

const formatReviews = reports => {
  return _(reports)
    .groupBy('user')
    .map((groupReport, user) => {
      const count = groupReport.length
      return { user, count }
    })
    .orderBy('count', 'desc')
    .value()
}

export default async ({ max }) => {
  const results = await getPullRequests({ max })
  let reviews = await getAllReviews(results)
  reviews = await filterReviews(reviews)
  reviews = await formatReviews(reviews)
  return reviews
}
