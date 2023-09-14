import { GetServerSideProps } from 'next'
import React from 'react'

interface userIdProps {
  id: string
}

const UserIdPage = ({ id }: userIdProps) => {
  return <div>{id}</div>
}

export default UserIdPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.params!.uid

  return {
    props: {
      id: 'user-id' + userId,
    },
  }
}
