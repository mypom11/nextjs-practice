import AllPosts from '@/components/posts/AllPosts'
import { getAllPosts } from '@/lib/post-util'
import { postModel } from '@/model'
import Head from 'next/head'
import React from 'react'

interface allPostProps {
  posts: postModel[]
}

const AllPostsPage = ({ posts }: allPostProps) => {
  return (
    <>
      <Head>
        <title>All My Posts</title>
        <meta name="decriptioin" content="A list of All programming posts" />
      </Head>
      <AllPosts posts={posts} />
    </>
  )
}

export const getStaticProps = () => {
  const allPosts = getAllPosts()

  return {
    props: {
      posts: allPosts,
    },
  }
}

export default AllPostsPage
