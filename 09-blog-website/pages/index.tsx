import FeaturedPosts from '@/components/home-page/FeaturedPosts'
import Hero from '@/components/home-page/Hero'
import { getFeturedPost } from '@/lib/post-util'
import { postModel } from '@/model'
import Head from 'next/head'
import React from 'react'

interface homeProps {
  posts: postModel[]
}

const HomePage = ({ posts }: homeProps) => {
  return (
    <>
      <Head>
        <title>Min Blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  )
}

export const getStaticProps = () => {
  const feturedPosts = getFeturedPost()

  return {
    props: {
      posts: feturedPosts,
    },
    revalidate: 60,
  }
}

export default HomePage
