import React, { useEffect, useState } from 'react'
import Header from './Header'
import { getCurrentUser } from '../api/authApi'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, removeUser } from '../utils/userSlice'
import MainVedio from './MainVedio'

const Browse = () => {
  const reduxUser = useSelector((state) => state.user.user)
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(!reduxUser)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (!token && !reduxUser) {
      navigate('/')
      return
    }

    const fetchUser = async () => {
      try {
        const data = await getCurrentUser()
        dispatch(setUser(data))
      } catch (err) {
        dispatch(removeUser())
        setError('Session expired or unauthorized. Please log in again.')
        setTimeout(() => navigate('/'), 1500)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [dispatch, navigate, reduxUser])

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header />
      <MainVedio />

    </div>
  )
}

export default Browse