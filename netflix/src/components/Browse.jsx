import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getCurrentUser } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, removeUser } from '../utils/userSlice'

const Browse = () => {
  const reduxUser = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(!reduxUser)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser()
        dispatch(setUser(data))
      } catch (err) {
        dispatch(removeUser())
        setError('Session expired or unauthorized. Please log in again.')
        setTimeout(() => navigate('/'), 2000)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [dispatch, navigate])

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <div className="pt-28 px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-red-600">Browse Content</h1>

        {loading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-red-600 border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="rounded-md border border-red-800 bg-red-950/50 p-4 text-red-400">
            {error}
          </div>
        ) : (
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 shadow-xl backdrop-blur">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Authenticated Session (Redux + JWT)
            </h2>
            <div className="space-y-2 text-neutral-300">
              <p>
                <strong className="text-neutral-400">User ID:</strong> {reduxUser?.id}
              </p>
              <p>
                <strong className="text-neutral-400">Username:</strong> {reduxUser?.username}
              </p>
              <p>
                <strong className="text-neutral-400">Email:</strong> {reduxUser?.email}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Browse