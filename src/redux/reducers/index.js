import { combineReducers } from 'redux'
import { FETCH_STUDENTS, FETCH_COHORT, FETCH_GROUPS, CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP, UPDATE_ACTIVE_STUDENT_X, UPDATE_ACTIVE_STUDENT_Y, UPDATE_FILTERS, UPDATE_MOD_FILTERS } from '../actions/constants'

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
    case UPDATE_GROUP:
      return state.map(g => g.id === action.payload.id ? action.payload : g)
    case DELETE_GROUP:
      return state.filter(g => g.id !== action.payload.id)
    // case UPDATE_FILTERS:
    //   if (action.payload !== 'all')
    default:
      return state
  }
}

const activeStudentXReducer = (state={}, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_STUDENT_X:
      return action.payload
    default:
      return state
  }
}

const activeStudentYReducer = (state={}, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_STUDENT_Y:
      return action.payload
    default:
      return state
  }
}

const filtersReducer = (state = { category: 'all', term: '', mod: 'all' }, action) => {
  switch (action.type) {
    case UPDATE_FILTERS:
      return {...state, [action.payload.target.name]: action.payload.target.value}
      case UPDATE_MOD_FILTERS:
        if (action.payload.target.value !== 'all') {
          return {...state, mod: parseInt(action.payload.target.value)}
        }
        return {...state, mod: 'all'}
    default:
      return state
  }
}

const rootReducer = combineReducers({
  test: testReducer,
  cohort: cohortReducer,
  students: studentsReducer,
  groups: groupsReducer,
  activeStudentX: activeStudentXReducer,
  activeStudentY: activeStudentYReducer,
  filters: filtersReducer
})

export default rootReducer