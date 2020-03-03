import { combineReducers } from 'redux'
import { FETCH_STUDENTS, FETCH_COHORT, FETCH_GROUPS, CREATE_GROUP } from '../actions/constants'

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
      const students = action.payload.sort((a, b) => a.first_name > b.first_name ? 1 : -1)
      
      return students
    default:
      return state
  }
}

const groupsReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return action.payload
    case CREATE_GROUP:
      return [...state, action.payload]
    default:
      return state
  }
}

const rootReducer = combineReducers({
  test: testReducer,
  cohort: cohortReducer,
  students: studentsReducer,
  groups: groupsReducer
})

export default rootReducer