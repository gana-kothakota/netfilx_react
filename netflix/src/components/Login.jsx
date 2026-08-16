import React, { useState, useRef } from 'react'
import Header from './Header'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Validation } from '../utils/Validate'
import { loginUser, registerUser } from '../api/authApi'
import { addUser } from '../utils/userSlice'

const Login = () => {
  const [signIn, setSignIn] = useState(true)
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const phoneRef = useRef(null)
  const passwordRef = useRef(null)
  const [validationError, setValidationError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleValidation = async () => {
    const email = emailRef.current?.value?.trim() ?? ''
    const username = usernameRef.current?.value?.trim() ?? ''
    const phone = phoneRef.current?.value?.trim() ?? ''
    const password = passwordRef.current?.value ?? ''

    const isValid = signIn
      ? Validation(email, '', password)
      : Validation(email, phone, password)

    if (!isValid) {
      setValidationError(
        'Invalid input. Please check your email, phone number (10 digits), and password (at least 8 chars with 1 letter & 1 number).'
      )
      return
    }

    setValidationError('')
    setLoading(true)

    try {
      let data
      if (signIn) {
        data = await loginUser({ email, username: email, password })
      } else {
        data = await registerUser({
          username: username || email.split('@')[0],
          email,
          password,
          phone,
        })
      }

      if (data && data.user) {
        dispatch(
          addUser({
            user: data.user,
            token: data.tokens?.access,
          })
        )
      }

      navigate('/Browse')
    } catch (error) {
      setValidationError(error.message || 'An error occurred during authentication.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black">
      <div className="relative z-30">
        <Header />
      </div>

      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/ea534f76-b87f-4720-9605-cb29cfd9fefe/web/IN-en-20260810-TRIFECTA-perspective_5a83c581-2878-466b-87a0-19d0bf50f4bc_large.jpg"
        alt="Netflix background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleValidation()
          }}
          className="w-full max-w-md rounded-lg border border-white/10 bg-black/70 p-10 shadow-2xl backdrop-blur-md"
        >
          <h1 className="mb-8 text-3xl font-bold text-white">
            {signIn ? 'Sign In' : 'Sign Up'}
          </h1>

          <div className="flex flex-col gap-5">
            {signIn ? (
              <>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email or username"
                  className="w-full rounded-md border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 transition focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />

                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 transition focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </>
            ) : (
              <>
                <input
                  ref={usernameRef}
                  type="text"
                  placeholder="Username"
                  className="w-full rounded-md border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 transition focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />

                <input
                  ref={phoneRef}
                  type="number"
                  placeholder="Phone number"
                  className="w-full rounded-md border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 transition focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />

                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-md border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 transition focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />

                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-md border border-gray-600 bg-gray-800/80 px-4 py-3 text-white placeholder-gray-400 transition focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
                />
              </>
            )}

            {validationError && (
              <p className="text-sm font-semibold text-red-500">{validationError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-red-600 px-4 py-3 font-semibold text-white transition duration-200 hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : signIn ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          <div className="mt-6 flex justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-gray-300 hover:underline">
              Need help?
            </a>
          </div>

          <p className="mt-8 text-gray-400">
            {signIn ? 'New to Netflix?' : 'Already have an account?'}{' '}
            <span
              onClick={() => {
                setSignIn(!signIn)
                setValidationError('')
              }}
              className="cursor-pointer text-white hover:underline font-semibold"
            >
              {signIn ? 'Sign up now.' : 'Sign in now.'}
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login