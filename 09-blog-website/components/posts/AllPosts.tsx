import React from 'react'
import classes from './AllPosts.module.css'
import PostsGrid from './PostsGrid'
import { postModel } from '@/model'

interface allPostsProps {
  posts: postModel[]
}

const AllPosts = ({ posts }: allPostsProps) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default AllPosts
