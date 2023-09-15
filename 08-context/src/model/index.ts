import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'

export interface eventModel {
  title: string
  image: string
  date: string
  location: string
  id: string
  description?: string
  isFeatured?: boolean
}

export interface commentModel {
  _id?: ObjectId
  email: string
  name: string
  text: string
  eventId?: string
}

export type apiModel = (req: NextApiRequest, res: NextApiResponse) => void
