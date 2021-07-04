import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from "react-router-dom"
import axios from 'axios'
import styles from './home.module.css'

const Test = ({ questions, user }) => {
  const form = useRef(null)

  const handleSubmit  = (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(form.current).entries())
    const responses = questions.map((question) =>{
      return { question: question.Question, value: formData[question.Question] || "off" }
    })
    const submission = {
      username: user.username,
      date: Date(),
      userId: user.id,
      responses: responses
    }
    axios.post('http://localhost:4000/api/submissions', submission)
      .then(()=>{
        alert('Test Submitted')
      })
  }

  return (
    <form
      ref={form}
      className={styles.test}
      onSubmit={handleSubmit}
    >
      {questions && questions.map((question) => (
        <label key={question._id}>
          {question.Label}
          {question.Options ?
            <select name={question.Question}>
              {question.Options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
            :<input type={question.Type} name={question.Question} />
          }
        </label>
      ))}
      <button className={styles.btn} >SUBMIT</button>
    </form>
  )
}

const History = ({ submissions }) => {
  return (
    <div className={styles.history}>
      {submissions.map((submission) => (
        <Submission key={submission._id} submission={submission} />
      ))}
    </div>
  )
}

const Submission = ({ submission }) => {
  const replaceWithBool = (value) => {
    if (value === "on") {
      return "true"
    } else if (value === "off") {
      return "false"
    }
    return value
  }

  return (
    <div className={styles.submission}>
      <p>Date: {new Date(submission.date).toDateString()}</p>
      <p>Username: {submission.username}</p>
      <p>Responses:</p>
      <ul>
        {submission.responses.map((response) => (
          <li key={response._id} >
            Question {response.question}: {replaceWithBool(response.value)}
          </li>
        ))}
      </ul>
    </div>
  )
}

const Home = ({user}) => {
  const history = useHistory();
  if (!user) history.push('/');

  const [questions, setQuestions] = useState()
  const [submissions, setSubmissions] = useState()
  const [displayHistory, setDisplayHistory] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await axios.get('http://localhost:4000/api/questions')
      setQuestions(result.data)
    }
    const fetchSubmissions = async () => {
      let query
      if (user) query = user.id === 'admin' ? "" : `?id=${user.id}`
      const result = await axios.get('http://localhost:4000/api/submissions' + query)
      setSubmissions(result.data)
    }
    fetchQuestions()
    fetchSubmissions()
  }, [displayHistory, user])

  const renderContent = () => {
    if (questions) {
      return displayHistory
        ? <History submissions={submissions} />
        : <Test questions={questions} user={user} />
    }
    return null
  }

  return (
    <div className={styles.container} >
      <div className={styles.selection}>
        <button onClick={() => setDisplayHistory(false)} >
          TAKE TEST
        </button>
        <button onClick={() => setDisplayHistory(true)} >
          HISTORY
        </button>
      </div>
      {renderContent()}
    </div>
  )
}

export default Home;
