import React from 'react'
import classes from './PostsGrid.module.css'
import PostItem from './PostItem'
import { postModel } from '@/model'

interface postGridProps {
  posts: postModel[]
}

const PostsGrid = ({ posts }: postGridProps) => {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  )
}

export default PostsGrid
