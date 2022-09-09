import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { reset, getGoals } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { goals, isLoading, isError, message } = useSelector(state => state.goals)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getGoals()) // this will put it in goals selector above
      if (isError) console.error(message)
      // when leaving the dashboard
      // to reset goals when component UNMOUNT => return something from useEffect
      return () => {
        dispatch(reset())
      }
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) return <Spinner />
  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map(goal => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}
export default Dashboard
