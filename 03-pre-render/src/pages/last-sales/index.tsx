import { GetStaticProps } from 'next'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
interface lastSalesProps {
  salesData: saleModel[]
}

const LastSalesPage = ({ salesData }: lastSalesProps) => {
  const [sales, setSales] = useState(salesData)
  // const [isLoading, setIsLoading] = useState(false)

  const { data, error } = useSWR(
    'https://next-project-f8c39-default-rtdb.firebaseio.com/sales.json',
    fetcher
  )
  useEffect(() => {
    if (data) {
      const transformedSales: saleModel[] = []
      for (const key in data) {
        transformedSales.push({
          id: key,
          userName: data[key].userName,
          volume: +data[key].volume,
        })
      }
      setSales(transformedSales)
    }
  }, [data])

  if (error) {
    return <p>No Data yet</p>
  }

  if (!data && !sales) {
    return <p>Loading....</p>
  }

  /*
  useEffect(() => {
    setIsLoading(true)
    fetch('https://next-project-f8c39-default-rtdb.firebaseio.com/sales.json')
      .then((response) => response.json())
      .then((data) => {
        const transformedSales: saleModel[] = []
        for (const key in data) {
          transformedSales.push({
            id: key,
            userName: data[key].userName,
            volume: +data[key].volume,
          })
        }
        setIsLoading(false)
        setSales(transformedSales)
      })
  }, [])
  */

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.userName} - ${sale.volume}
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    'https://next-project-f8c39-default-rtdb.firebaseio.com/sales.json'
  )
  const data = await response.json()

  const transformedSales: saleModel[] = []
  for (const key in data) {
    transformedSales.push({
      id: key,
      userName: data[key].userName,
      volume: +data[key].volume,
    })
  }
  return {
    props: { salesData: transformedSales },
  }
}

export default LastSalesPage
