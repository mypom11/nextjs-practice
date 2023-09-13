import { useRouter } from 'next/router'
import React from 'react'

const ClientProjects = () => {
  const router = useRouter()

  console.log(router.query)

  const loadProjectHandler = () => {
    //load data
    router.push({
      pathname: '.clients/[id]/[clientprojectId]',
      query: { id: 'max', clientprojectid: 'projectA' },
    })
  }

  return (
    <div>
      <h1>ClientProjects</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  )
}

export default ClientProjects
