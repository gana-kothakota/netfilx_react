import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../api/authApi'
import { removeUser } from '../utils/userSlice'

const Header = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = () => {
    logoutUser()
    dispatch(removeUser())
    navigate('/')
  }

  return (
    <div className="absolute top-0 z-30 flex w-full items-center justify-between bg-gradient-to-b from-black/80 to-transparent p-4 px-8">
      <img
        className="w-36 md:w-44 cursor-pointer"
        src="https://occ.a.nflxso.net/dnmt/api/v6/iL4oJVDYZ8KLSrJ6eG2OwtghbfQ/AAAAAfwxusEeCteu-L_QQ56_G2cohyI1E4BIh2uyr5t9gDhH0CKWHw3NVhndjuF7yQ26z3cYq_lnzY5pP6OarHyiibuiy2jIIa5sIhSvgal1S6u9YDVAyVoX6osPniEKN-dYy77H_pLfOCD7.svg"
        alt="Netflix Logo"
        onClick={() => navigate(user ? '/browse' : '/')}
      />

      {user && (
        <div className="flex items-center gap-4 text-white">
          <span className="hidden font-medium md:inline-block">
            Welcome, {user.username || user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="rounded bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header