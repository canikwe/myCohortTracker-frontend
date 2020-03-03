import { combineReducers } from 'redux'
import { FETCH_STUDENTS } from '../actions/constants'

const testReducer = (state=[], action) => {
  return state
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
  students: studentsReducer 
})

export default rootReducer