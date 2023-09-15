import React, { useContext } from 'react'
import MainHeader from './MainHeader'
import Notification from '../UI/Notification'
import NotificationContext from '@/store/notification-context'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notificationCtx = useContext(NotificationContext)

  const { title, message, status } = notificationCtx.notification

  return (
    <>
      <MainHeader />
      <main>{children}</main>
      {notificationCtx.notification.status !== '' && (
        <Notification title={title} message={message} status={status} />
      )}
    </>
  )
}

export default Layout
