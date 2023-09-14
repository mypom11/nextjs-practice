import React from 'react'
import { GetStaticProps } from 'next'
import { getData } from '@/api'

interface porductDetailProps {
  loadedProduct: productModel
}

const ProductDetailPage = ({ loadedProduct }: porductDetailProps) => {
  if (!loadedProduct) {
    return <p>Loading.....</p>
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  const productId = params!.pid
  const data = await getData()
  const product = data.products.find(
    (product: productModel) => product.id === productId
  )

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      loadedProduct: product,
    },
  }
}

export const getStaticPaths = async () => {
  const data = await getData()
  const ids = data.products.map((product: productModel) => product.id)
  const pathsWithParams = ids.map((id: string) => ({ params: { pid: id } }))

  return {
    paths: pathsWithParams,
    fallback: true,
  }
}

export default ProductDetailPage
