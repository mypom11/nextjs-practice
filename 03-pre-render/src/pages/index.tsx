import React from 'react'
import Link from 'next/link'
import { getData } from '@/api'

interface homePageProps {
  products: productModel[]
}

const HomePage = ({ products }: homePageProps) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps = async () => {
  console.log('(RE-)Generating....')

  const data = await getData()
  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    }
  }

  if (data.products.length === 0) {
    return {
      notFoound: true,
    }
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  }
}

export default HomePage
