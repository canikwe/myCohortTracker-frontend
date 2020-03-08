import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loggingIn } from '../redux/actions/async'

const Login = () => {

  const [loginInfo, updateLoginInfo] = useState({name: '', password: ''})
  const dispatch = useDispatch()

  const handleChange = e => {
    updateLoginInfo({...loginInfo, [e.target.name]: e.target.value})
  }

  const submitForm = e => {
    e.preventDefault()
    dispatch(loggingIn(loginInfo))
  }

  return (
    <>
      <h2>Login Here</h2>
      <form className='login' onSubmit={submitForm}>
        <div>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={loginInfo.name} onChange={handleChange}/>
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={loginInfo.password} onChange={handleChange}/>
        </div>
        <div>
          <input type='submit' value='Login' />
        </div>
      </form>
    </>
  )
}

export default Login