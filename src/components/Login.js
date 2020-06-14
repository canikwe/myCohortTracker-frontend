import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loggingIn, loggingInWithGoogle } from '../redux/actions/async'
import { GoogleLogin } from 'react-google-login'
import 'undraw_noted_pc9f.svg'

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

  const responseGoogle = res => {
    dispatch(loggingInWithGoogle(res.tokenId))
  }

  return (
    <div className='login-container'>

      <div className='login-form'>

        <div className='login-header'>
          <img alt='logo' className='logo' src={require('../helper/mact.png')} /> 
          <h2>
            my awesome cohort tracker
          </h2>
        </div>

        <h1>Welcome Back <span role='img' aria-label='confetti'>🎉</span></h1>

        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText='Login with Google'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          className='google-login'
        />

        <div className='separator'>
          <div className='hr-line'></div>
          <span className='hr-text'>Or with login name</span>
        </div>

        <form className='login' onSubmit={submitForm}>
          <div>
            <label htmlFor='name'>Login Name</label>
            <input 
              type='text' 
              name='name' 
              value={loginInfo.name}
              onChange={handleChange}
              placeholder='Login Name'
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input 
              type='password' 
              name='password' 
              value={loginInfo.password} 
              onChange={handleChange}
              placeholder='Password'
              autoComplete='on'
            />
          </div>
          <div>
            <input type='submit' value='Log in' />
          </div>
        </form>

      </div>

      <div className='login-splash'>
        <p>
          Welcome to My Awesome Cohort Tracker!
        </p>
        <img src={require('../helper/undraw_noted_pc9f.svg')} />
      </div>

    </div>
  )
}

export default Login