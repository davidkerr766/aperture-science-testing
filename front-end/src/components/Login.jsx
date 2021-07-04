import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import styles from './login.module.css'
import logo from '../images/aperture_logo.svg'
import axios from 'axios'

const Login = ({setUser}) => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const credentials = {
      Username: userName,
      Password: password,
    }
    const response = await axios.post('http://localhost:4000/api/login', credentials)
    if (response.data.role && response.data.role === 'admin') {
      setUser('admin')
      history.push('/home')
    } else if (response.data.length > 0) {
      setUser(response.data[0]._id)
      history.push('/home')
    } else {
      setError(true)
    }
  }

  return (
    <div className={styles.container} >
      <img 
        className={styles.logo}
        src={logo} 
        alt="aperture laboratories logo"
      />
      <div className={`${styles.login} ${error ? styles.error : ""}`}>
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
