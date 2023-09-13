import React, { useRef } from 'react'
import Button from '../UI/Button'

import classes from './EventSearch.module.css'

interface eventSearchProps {
  onSearch: (year: string, month: string) => void
}

const EventSearch = ({ onSearch }: eventSearchProps) => {
  const yearInputRef = useRef<HTMLSelectElement>(null)
  const monthInputRef = useRef<HTMLSelectElement>(null)

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const selelctedYear = yearInputRef.current!.value
    const selelctedMonth = monthInputRef.current!.value

    onSearch(selelctedYear, selelctedMonth)
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearInputRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthInputRef}>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">september</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">Decemver</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  )
}

export default EventSearch
