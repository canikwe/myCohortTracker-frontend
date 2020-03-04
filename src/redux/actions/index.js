import { creatingGroup, fetchingGroups } from './group'
import { UPDATE_ACTIVE_STUDENT_X, UPDATE_ACTIVE_STUDENT_Y, UPDATE_FILTERS, UPDATE_MOD_FILTERS } from "./constants";

export const updateActiveStudentX = student => ({type: UPDATE_ACTIVE_STUDENT_X, payload: student})
export const updateActiveStudentY = student => ({type: UPDATE_ACTIVE_STUDENT_Y, payload: student})

export const updateFilters = event => ({type: UPDATE_FILTERS, payload: event})
export const updateModFilters = event => ({type: UPDATE_MOD_FILTERS, payload: event})

export { creatingGroup, fetchingGroups }