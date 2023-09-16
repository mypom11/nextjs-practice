import React from 'react'
import PostContent from '../../components/posts/post-detail/PostContent'
import { getPostData, getPostsFiles } from '@/lib/post-util'
import { GetStaticPaths, GetStaticProps } from 'next'
import { postModel } from '@/model'
import Head from 'next/head'

interface postDetailProps {
  post: postModel
}

const PostDetailPage = ({ post }: postDetailProps) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="decription" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  )
}

export const getStaticProps: GetStaticProps = (context) => {
  const { slug } = context.params || {}

  const postData = getPostData(slug as string)

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const postFileNames = getPostsFiles()
  const slugs = postFileNames.map((filename) => filename.replace(/\.md$/, ''))
  return {
    paths: slugs.map((slug) => ({
      params: {
        slug: slug,
      },
    })),
    fallback: false,
  }
}

export default PostDetailPage
