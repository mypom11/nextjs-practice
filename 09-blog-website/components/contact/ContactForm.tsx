import React, { useEffect, useState } from 'react'
import classes from './ContactForm.module.css'
import Notification from '../ui/Notification'

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredName, setEnteredName] = useState('')
  const [enteredMessage, setEnteredMessage] = useState('')
  const [requestStatus, setRequestStatus] = useState('') //'pending', 'success', 'error'
  const [requestError, setRequestError] = useState('')

  interface contactModel {
    email: string
    name: string
    message: string
  }

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus('')
        setRequestError('')
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [requestStatus])

  const sendContactData = async (contactDetails: contactModel) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactDetails),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Somethin went wrong!')
    }
  }

  const sendMessagehandler = async (event: React.FormEvent) => {
    event.preventDefault()

    setRequestStatus('pending')
    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      })
      setRequestStatus('success')
      setEnteredEmail('')
      setEnteredName('')
      setEnteredMessage('')
    } catch (error: any) {
      setRequestError(error.message)
      setRequestStatus('error')
    }
  }

  let notification

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending Message....',
      message: 'Your message is on its way!',
    }
  }
  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Sending Message success',
      message: 'Your message is success!',
    }
  }
  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Sending Message success',
      message: requestError,
    }
  }
  return (
    <section className={classes.contact}>
      <h1>How can I help you</h1>
      <form action="" className={classes.form} onSubmit={sendMessagehandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  )
}

export default ContactForm
