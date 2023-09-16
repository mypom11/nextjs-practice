import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { postModel } from '@/model'

const postDirectory = path.join(process.cwd(), 'content', 'posts')

export const getPostsFiles = () => {
  return fs.readdirSync(postDirectory)
}

export const getPostData = (postIdentifier: string): postModel => {
  const postSlug = postIdentifier.replace(/\.md$/, '')
  const filePath = path.join(postDirectory, `${postSlug}.md`)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  const postData = {
    slug: postSlug,
    title: data.title,
    image: data.image,
    date: data.date,
    excerpt: data.excerpt,
    isFeatured: data.isFeatured,
    content,
  }

  return postData
}

export const getAllPosts = () => {
  const postFiles = getPostsFiles()

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile)
  })

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  )
  return sortedPosts
}

export const getFeturedPost = () => {
  const allPosts = getAllPosts()

  const featuredPosts = allPosts.filter((post) => post.isFeatured)

  return featuredPosts
}
