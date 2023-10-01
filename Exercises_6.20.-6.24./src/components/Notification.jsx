import { useEffect } from "react"
import { useNotification } from "../notificationContex"
import { useNotificationDispatch } from "../notificationContex"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotification()
  const notificationDispatch = useNotificationDispatch()

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      notificationDispatch({ type: 'SET', payload: '' });
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [notification, notificationDispatch])
  
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
