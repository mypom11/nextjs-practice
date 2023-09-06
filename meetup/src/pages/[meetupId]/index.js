import MeetupDetail from '@/components/meetups/MeetupDetail'
import Head from 'next/head'

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>meetup {props.meetupData.title}</title>
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  )
}

export const getStaticPaths = async () => {
  const response = await fetch(
    'https://react-http-238a4-default-rtdb.firebaseio.com/meetup.json'
  )
  const data = await response.json()
  const meetups = []

  for (const key in data) {
    meetups.push({
      id: data[key].id,
    })
  }

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({ params: { meetupId: meetup.id } })),
  }
}

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId

  const response = await fetch(
    'https://react-http-238a4-default-rtdb.firebaseio.com/meetup.json'
  )
  const data = await response.json()
  const meetups = []

  for (const key in data) {
    meetups.push({
      id: data[key].id,
      title: data[key].title,
      image: data[key].image,
      address: data[key].address,
      description: data[key].description,
    })
  }
  const selectedMeetup = meetups.find((meetup) => meetup.id === meetupId)

  return {
    props: {
      meetupData: selectedMeetup,
    },
  }
}

export default MeetupDetails
