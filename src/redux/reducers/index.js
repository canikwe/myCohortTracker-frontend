import { combineReducers } from 'redux'
import { FETCH_STUDENTS, FETCH_COHORT } from '../actions/constants'

const testReducer = (state=[], action) => {
  return state
}

const cohortReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_COHORT:
      return action.payload
    default:
      return state
  }
}

const studentsReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  test: testReducer,
  cohort: cohortReducer,
  students: studentsReducer
})

export default rootReducer