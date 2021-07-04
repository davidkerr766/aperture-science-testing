import React, { useState } from 'react'
import styles from './login.module.css'
import logo from '../images/aperture_logo.svg'

const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userName, password)
  }

  return (
    <div className={styles.container} >
      <img 
        className={styles.logo}
        src={logo} 
        alt="aperture laboratories logo"
      />
      <div className={styles.login}>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input onChange={(e) => setUserName(e.target.value)}/>
          </label>
          <label>
            Password
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className={styles.btn} >LOGIN</button>
        </form>
      </div>
    </div>
  )
}

export default Login;
