import { GetServerSideProps } from 'next'
import React from 'react'

interface userProfileProps {
  userName: string
}

const UserProfilePage = ({ userName }: userProfileProps) => {
  return <h1>{userName}</h1>
}

export default UserProfilePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, req, res } = context

  return {
    props: {
      userName: 'Max',
    },
  }
}
