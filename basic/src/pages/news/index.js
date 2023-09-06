import Link from 'next/link'

const NewsPage = () => {
  return (
    <>
      <h1>The News Page</h1>
      <ul>
        <li>
          <Link href="news/d1">NextJS Is A Great Framework</Link>
        </li>
        <li>
          <Link href="news/d2">NextJS Is A Great</Link>
        </li>
      </ul>
    </>
  )
}

export default NewsPage
