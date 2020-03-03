import { creatingGroup, fetchingGroups } from './group'
import { UPDATE_ACTIVE_STUDENT_X, UPDATE_ACTIVE_STUDENT_Y } from "./constants";

export const updateActiveStudentX = student => ({type: UPDATE_ACTIVE_STUDENT_X, payload: student})
export const updateActiveStudentY = student => ({type: UPDATE_ACTIVE_STUDENT_Y, payload: student})

export { creatingGroup, fetchingGroups }