import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1>HomePage</h1>
      <ul>
        <li>
          <Link replace href="/portfolio">
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/clients">clients</Link>
        </li>
        <li>
          <Link href="/blog">blog</Link>
        </li>
        <li>
          <Link href="/about">about</Link>
        </li>
      </ul>
    </div>
  )
}
