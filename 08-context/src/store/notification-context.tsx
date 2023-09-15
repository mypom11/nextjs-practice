import { createContext, useEffect, useState } from 'react'

interface notificationItemModel {
  title: string
  message: string
  status: string
}

interface notificationModel {
  notification: notificationItemModel
  showNotification: (notificationData: notificationItemModel) => void
  hideNotification: () => void
}

interface providerProps {
  children: React.ReactNode
}

const NotificationContext = createContext({
  notification: { title: '', message: '', status: '' },
  showNotification: (notificationData: notificationItemModel) => {},
  hideNotification: () => {},
})

export const NotificationContextProvider = ({ children }: providerProps) => {
  const [activeNotification, setActiveNotification] =
    useState<notificationItemModel>({ title: '', message: '', status: '' })

  useEffect(() => {
    if (
      activeNotification.status === 'success' ||
      activeNotification.status === 'error'
    ) {
      const timer = setTimeout(() => {
        setActiveNotification({ title: '', message: '', status: '' })
      }, 3000)

      return clearTimeout(timer)
    }
  }, [activeNotification])

  const showNotificationHandler = (notificationData: notificationItemModel) => {
    setActiveNotification(notificationData)
  }

  const hideNotificationHandler = () => {
    setActiveNotification({ title: '', message: '', status: '' })
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  }

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
