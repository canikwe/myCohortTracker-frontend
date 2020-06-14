export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000/'
export const HEADERS = {
  'Content-Type': 'application/json',
  'Accepted': 'application/json'
 }

// cohort
export const FETCH_COHORT = 'FETCH_COHORT'
export const FETCH_COHORTS = 'FETCH_COHORTS'
export const CREATE_COHORT = 'CREATE_COHORT'
export const UPLOAD_CSV = 'UPLOAD_CSV'
export const UPDATE_COHORT = 'UPDATE_COHORT'

// students
export const FETCH_STUDENTS = 'FETCH_STUDENTS'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const CREATE_STUDENT = 'CREATE_STUDENT'

// groups
export const FETCH_GROUPS = 'FETCH_GROUPS'
export const CREATE_GROUP = 'CREATE_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const DELETE_GROUP = 'DELETE_GROUP'
export const SELECT_GROUP = 'SELECT_GROUP'

// activities
export const FETCH_ACTIVITIES = 'FETCH_ACTIVITIES'

// sidebar
export const OPEN_GROUP_FORM = 'OPEN_GROUP_FORM'
export const CLOSE_GROUP_FORM = 'CLOSE_GROUP_FORM'

  // activity actions
export const SHOW_ACTIVITY_CREATE = 'SHOW_ACTIVITY_CREATE'
export const SEARCH_ACTIVITY = 'SEARCH_ACTIVITY'
export const SELECT_ACTIVITY = 'SELECT_ACTIVITY'
export const RESET_SELECTED_ACTIVITY = 'RESET_SELECTED_ACTIVITY'
export const CLOSE_CREATE_ACTIVITY_FORM = 'CLOSE_CREATE_ACTIVITY_FORM'
export const CREATE_ACTIVITY = 'CREATE_ACTIVITY'

// misc
export const UPDATE_ACTIVE_STUDENT_X = 'UPDATE_ACTIVE_STUDENT_X'
export const UPDATE_ACTIVE_STUDENT_Y = 'UPDATE_ACTIVE_STUDENT_Y'
export const LOGIN_USER = 'LOGIN_USER'
export const UPDATE_LOADING = 'UPDATE_LOADING'
export const LOGIN_WITH_GOOGLE = 'LOGIN_WITH_GOOGLE'

export const UPDATE_FILTERS = 'UPDATE_FILTERS'
export const UPDATE_MOD_FILTERS = 'UPDATE_MOD_FILTERS'

export const HANDLE_REDIRECT = 'HANDLE_REDIRECT'
