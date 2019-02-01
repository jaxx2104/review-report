interface User {
  login: string
}

export interface Review {
  number: number
  state: string
  submitted_at: Date
  user: User
}

export interface Reviews {
  data: Review[]
}

export interface FormatReview {
  user: string
  state: string
  date: Date
}

export interface Table {
  user: string
  count: number
}
