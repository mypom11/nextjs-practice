import classes from './EventSummary.module.css'

interface propsData {
  title: string
}

function EventSummary({ title }: propsData) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  )
}

export default EventSummary
