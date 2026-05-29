import React from 'react'

// Importing Module CSS
import styles from "./Hero.module.css"
const Hero = () => {
  return (
    <div className={styles.hero}>
      <h1>Welcome to My World...</h1>
      <h3>Admin Vansh</h3>
      <button>Checkout</button>
    </div>
  )
}

export default Hero
