import MeetupList from '@/components/meetups/MeetupList'
import Head from 'next/head'

const HomePage = (props) => {
  // console.log(props.meetups)
  return (
    <>
      <Head>
        <title>React Meetup</title>
        <meta
          name="description"
          contet="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  )
}

export const getStaticProps = async () => {
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

  return {
    props: {
      meetups,
    },
    revalidate: 1,
  }
}

// export const getServerSideProps = (context) => {
//   const req = context.req
//   const res = context.res

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   }
// }

export default HomePage
