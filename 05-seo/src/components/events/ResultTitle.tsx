import Button from '../UI/Button'
import classes from './ResultTitle.module.css'

interface resultTitleProps {
  date: Date
}

function ResultsTitle({ date }: resultTitleProps) {
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Button link="/events">Show all events</Button>
    </section>
  )
}

export default ResultsTitle
