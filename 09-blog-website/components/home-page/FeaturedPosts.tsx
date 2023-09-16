import React from 'react'
import classes from './FeaturedPosts.module.css'
import PostsGrid from '../posts/PostsGrid'
import { postModel } from '@/model'

interface featuredPostsProps {
  posts: postModel[]
}

const FeaturedPosts = ({ posts }: featuredPostsProps) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  )
}

export default FeaturedPosts
