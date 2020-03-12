import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loggingIn, loggingInWithGoogle } from '../redux/actions/async'
import { GoogleLogin } from 'react-google-login'

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

  const responseGoogle = res => dispatch(loggingInWithGoogle(res.tokenId))

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

      <p />
      <p />
      <p />
      <p />
      
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </>
  )
}

export default Login