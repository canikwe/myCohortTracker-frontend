import { creatingGroup } from './group'
import { UPDATE_ACTIVE_STUDENT_X, UPDATE_ACTIVE_STUDENT_Y, UPDATE_FILTERS, UPDATE_MOD_FILTERS, OPEN_GROUP_FORM, CLOSE_GROUP_FORM } from "./constants";

export const updateActiveStudentX = student => ({type: UPDATE_ACTIVE_STUDENT_X, payload: student})
export const updateActiveStudentY = student => ({type: UPDATE_ACTIVE_STUDENT_Y, payload: student})

// filters actions
export const updateFilters = event => ({type: UPDATE_FILTERS, payload: event})
export const updateModFilters = event => ({type: UPDATE_MOD_FILTERS, payload: event})

// group actions
export const openGroupForm = () => ({type: OPEN_GROUP_FORM})
export const closeGroupForm = () => ({type: CLOSE_GROUP_FORM})

export { creatingGroup }