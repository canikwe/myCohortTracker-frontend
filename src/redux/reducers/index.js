import { combineReducers } from 'redux'
import { FETCH_STUDENTS, FETCH_COHORT, FETCH_GROUPS, CREATE_GROUP, UPDATE_GROUP, DELETE_GROUP, UPDATE_ACTIVE_STUDENT_X, UPDATE_ACTIVE_STUDENT_Y, UPDATE_FILTERS, UPDATE_MOD_FILTERS, FETCH_ACTIVITIES, OPEN_GROUP_FORM, SHOW_ACTIVITY_SEARCH, SHOW_ACTIVITY_CREATE, RESET_SELECTED_ACTIVITY, SELECT_ACTIVITY, SEARCH_ACTIVITY, CANCEL_ACTIVITY_SEARCH, CLOSE_CREATE_ACTIVITY_FORM, CREATE_ACTIVITY, SELECT_GROUP, CLOSE_GROUP_FORM, FETCH_COHORTS, CREATE_COHORT } from '../actions/constants'

const testReducer = (state=[], action) => {
  return state
}

const cohortReducer = (state = {}, action) => {
  switch (action.type) {
    // case FETCH_COHORTS:
    //   return action.payload[0]
    case FETCH_COHORT:
      return action.payload
    case CREATE_COHORT:
      return action.payload
    default:
      return state
  }
}

const cohortsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_COHORTS:
      return action.payload
    case CREATE_COHORT:
      return [...state, action.payload]
    default:
      return state
  }
}

const studentsReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_STUDENTS:
      return action.payload.sort((a, b) => a.first_name > b.first_name ? 1 : -1)
    case CREATE_COHORT:
      return action.payload.students.sort((a, b) => a.first_name > b.first_name ? 1 : -1)
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

const activitiesReducer = (state=[], action) => {
  switch (action.type) {
    case FETCH_ACTIVITIES:
      return action.payload
    case CREATE_ACTIVITY:
      return [...state, action.payload]
    default:
      return state
  }
}

const createGroupToggleReducer = (state=false, action) => {
  switch (action.type) {
    case OPEN_GROUP_FORM:
      return true
    case CLOSE_GROUP_FORM:
      return false
    case SELECT_GROUP:
      return true
    default:
      return state
  }
}

const activitySearchTermReducer = (state='', action) => {
  switch (action.type) {
    case SEARCH_ACTIVITY:
      return action.payload
    case SELECT_ACTIVITY:
      return action.payload.name
    default:
      return state
  }
}

const selectedActivityReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_ACTIVITY_SEARCH:
      return {}
    case SELECT_ACTIVITY:
      return action.payload
    case RESET_SELECTED_ACTIVITY:
      return {}
    case CREATE_ACTIVITY:
      return action.payload
    case SELECT_GROUP:
      return action.payload.activity
    case CLOSE_GROUP_FORM:
      return {}
    default:
      return state
  }
}

const initialGroupState = () => ({ notes: '', avoid: false, student_ids: [], activity_date: new Date().toISOString().slice(0, 10) })

const selectedGroupReducer = (state = initialGroupState(), action) => {
  switch (action.type) {
    case SELECT_GROUP:
      return action.payload
    case UPDATE_ACTIVE_STUDENT_X:
      return {...initialGroupState(), activity_date: state.activity_date}
    case UPDATE_ACTIVE_STUDENT_Y:
      return { ...initialGroupState(), activity_date: state.activity_date }
    case DELETE_GROUP:
      return { ...initialGroupState(), activity_date: state.activity_date }
    case CLOSE_GROUP_FORM:
      return initialGroupState()
    default:
      return state
  }
}

const activityOptionsReducer = (state = 1, action) => {
  // key { 1: activityOptions, 2: createActivityForm, 3: searchActivityForm }
  switch (action.type) {
    case SHOW_ACTIVITY_SEARCH:
      return 2
    case SHOW_ACTIVITY_CREATE:
      return 3
    case SELECT_ACTIVITY:
      return 1
    case CANCEL_ACTIVITY_SEARCH:
      return 1
    case CLOSE_CREATE_ACTIVITY_FORM:
      return 1
    case CREATE_ACTIVITY:
      return 1
    case CLOSE_GROUP_FORM:
      return 1
    default:
      return state
  }
}



const rootReducer = combineReducers({
  test: testReducer,
  cohort: cohortReducer,
  cohorts: cohortsReducer,
  students: studentsReducer,
  groups: groupsReducer,
  activeStudentX: activeStudentXReducer,
  activeStudentY: activeStudentYReducer,
  filters: filtersReducer,
  activities: activitiesReducer,
  createGroupToggle: createGroupToggleReducer,
  activitySearchTerm: activitySearchTermReducer,
  selectedActivity: selectedActivityReducer,
  selectedGroup: selectedGroupReducer,
  activityOptions: activityOptionsReducer
})

export default rootReducer