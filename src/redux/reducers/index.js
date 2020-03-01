import { combineReducers } from 'redux'

const testReducer = (state=[], action) => {
  return state
}

const rootReducer = combineReducers({ test: testReducer })

export default rootReducer