import { GetStaticProps } from 'next'
import React, { useState } from 'react'
import { buildFeedbackPath, extractFeedback } from '../api/feedback'
interface feedbackModel {
  id: string
  text: string
  email: string
}
interface feedbackProps {
  feedbackItems: feedbackModel[]
}

const FeedbackPage = ({ feedbackItems }: feedbackProps) => {
  const [feedbackData, setFeedbackData] = useState<feedbackModel>()
  const loadFeedbackHandler = (id: string) => {
    fetch(`/api/feedback/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setFeedbackData(data.feedback)
      })
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              ShowDetail
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const filePath = buildFeedbackPath()
  const data = extractFeedback(filePath)
  return {
    props: {
      feedbackItems: data,
    },
  }
}

export default FeedbackPage
