import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import styles from './home.module.css'

const Home = ({user}) => {
  const history = useHistory();
  if (!user) history.push('/');

  const [questions, setQuestions] = useState()
  const form = useRef(null)

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await axios.get('http://localhost:4000/api/questions')
      setQuestions(result.data)
    }
    fetchQuestions()
  }, [])

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
    <div className={styles.container} >
      <div className={styles.selection}>
        <button>TAKE TEST</button>
        <button>HISTORY</button>
      </div>
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
    </div>
  )
}

export default Home;
