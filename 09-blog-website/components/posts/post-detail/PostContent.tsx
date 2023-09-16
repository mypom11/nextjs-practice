import React from 'react'
import ReactMarkdown from 'react-markdown'
import classes from './PostContent.module.css'
import PostHeader from './PostHeader'
import { postModel } from '@/model'
import Image from 'next/image'

// const post = {
//   title: 'Getting Started with Nextjs',
//   image: 'getting-started-nextjs.png',
//   date: '2022-02-02',
//   slug: 'getting-started-with-nextjs',
//   content: '# This is a first post',
// }

interface postContentProps {
  post: postModel
}

const PostContent = ({ post }: postContentProps) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`

  // const custRenderers = {
  //   img(image) {
  //     return (
  //       <Image
  //         src={`/images/posts/${post.slug}/${image.src}`}
  //         alt={image.alt}
  //         width={600}
  //         height={300}
  //       />
  //     )
  //   },
  // }

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  )
}

export default PostContent
