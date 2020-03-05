import { creatingGroup, fetchingGroups } from './group'
import { UPDATE_ACTIVE_STUDENT_X, UPDATE_ACTIVE_STUDENT_Y, UPDATE_FILTERS, UPDATE_MOD_FILTERS, OPEN_GROUP_FORM, SHOW_ACTIVITY_SEARCH, SHOW_ACTIVITY_CREATE, RESET_SELECTED_ACTIVITY, SELECT_ACTIVITY, SEARCH_ACTIVITY, CANCEL_ACTIVITY_SEARCH } from "./constants";

export const updateActiveStudentX = student => ({type: UPDATE_ACTIVE_STUDENT_X, payload: student})
export const updateActiveStudentY = student => ({type: UPDATE_ACTIVE_STUDENT_Y, payload: student})

// filters actions
export const updateFilters = event => ({type: UPDATE_FILTERS, payload: event})
export const updateModFilters = event => ({type: UPDATE_MOD_FILTERS, payload: event})

// group actions
export const openGroupForm = bool => ({type: OPEN_GROUP_FORM, payload: bool})

// activity actions
export const showActivitySearch = () => ({type: SHOW_ACTIVITY_SEARCH})
export const showActivityCreate = activitySearchTerm => ({type: SHOW_ACTIVITY_CREATE, payload: activitySearchTerm})
export const searchActivity = event => ({type: SEARCH_ACTIVITY, payload: event.target.value})
export const cancelActivitySearch = () => ({type: CANCEL_ACTIVITY_SEARCH })
export const selectActivity = activity => ({type: SELECT_ACTIVITY, payload: activity})
export const resetSelectedActivity = () => ({type: RESET_SELECTED_ACTIVITY})

export { creatingGroup, fetchingGroups }