import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setNotification(''));
    }, notification.duration*1000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification