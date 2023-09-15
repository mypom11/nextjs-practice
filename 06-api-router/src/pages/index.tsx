import { useRef, useState } from 'react'

interface feedbackModel {
  id: string
  text: string
  email: string
}

export default function Home() {
  const [feedbackItems, setFeedbackItems] = useState<feedbackModel[]>([])
  const emailRef = useRef<HTMLInputElement>(null)
  const feedBackRef = useRef<HTMLTextAreaElement>(null)

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault()

    const enteredEmail = emailRef.current!.value
    const enteredFeedback = feedBackRef.current!.value

    const reqBody = { email: enteredEmail, text: enteredFeedback }

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data.feedback))
  }

  const loadFeedbackHandler = async () => {
    const response = await fetch('/api/feedback')
    const data = await response.json()
    console.log(data)
    setFeedbackItems(data.feedback)
  }
  return (
    <div>
      <h1>Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your Feedback</label>
          <textarea id="feedback" rows={5} ref={feedBackRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </div>
  )
}
