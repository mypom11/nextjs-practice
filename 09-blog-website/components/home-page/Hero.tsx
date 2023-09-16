import React from 'react'
import Image from 'next/image'

import classes from './Hero.module.css'

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/max.png"
          alt="An image showing Min"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, Im Min</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate a
        dolore incidunt ratione laboriosam! Nihil ducimus excepturi eius dolores
        quos unde sequi possimus consectetur, perferendis necessitatibus
        voluptatum praesentium. Laudantium, autem.
      </p>
    </section>
  )
}

export default Hero
