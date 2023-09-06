// import { MongoClient } from 'mongodb'
let id = 0
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const data = req.body

    const { title, image, address, description } = data
    id++
    // const client = await MongoClient.connect('')
    // const db = client.db()

    // const meetupsCollection = db.collection('meetups')

    // const result = await meetupsCollection.insertOne(data)

    // console.log(result)

    // client.close()

    const response = await fetch(
      'https://react-http-238a4-default-rtdb.firebaseio.com/meetup.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: `m${id}`,
          title,
          image,
          address,
          description,
        }),
      }
    )

    res.status(201).json({ message: 'Meetup inserted', data: response })
  }
}

export default handler
