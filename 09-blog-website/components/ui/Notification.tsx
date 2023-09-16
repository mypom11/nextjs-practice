import ReactDOM from 'react-dom'

import classes from './Notification.module.css'

interface notificationProps {
  title: string
  message: string
  status: string
}

function Notification({ title, message, status }: notificationProps) {
  let statusClasses = ''

  if (status === 'success') {
    statusClasses = classes.success
  }

  if (status === 'error') {
    statusClasses = classes.error
  }

  const cssClasses = `${classes.notification} ${statusClasses}`

  return ReactDOM.createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notification')!
  )
}

export default Notification
