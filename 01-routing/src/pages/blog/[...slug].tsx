import { useRouter } from 'next/router'
import React from 'react'

const BlogPage = () => {
  const router = useRouter()

  console.log(router.query)
  return (
    <div>
      <h1>BlogPage</h1>
    </div>
  )
}

export default BlogPage
