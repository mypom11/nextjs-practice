import { useRouter } from 'next/router'
import React from 'react'

const ClientProjectId = () => {
  const router = useRouter()
  console.log(router.query)
  return (
    <div>
      <h1>lientprojectId</h1>
    </div>
  )
}

export default ClientProjectId
