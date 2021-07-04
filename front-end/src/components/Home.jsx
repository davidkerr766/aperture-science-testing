import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios'
import styles from './home.module.css'

const Home = ({user}) => {
  const history = useHistory();
  if (!user) history.push('/');

  const [questions, setQuestions] = useState()

  useEffect(() => {
    const fetchQuestions = async () => {
      const result = await axios.get('http://localhost:4000/api/questions')
      setQuestions(result.data)
    }
    fetchQuestions()
  }, [])


  return (
    <div className={styles.container} >
      <div className={styles.selection}>
        <button>TAKE TEST</button>
        <button>HISTORY</button>
      </div>
      <form className={styles.test}>
        {questions && questions.map((question) => (
          <label key={question._id}>
            {question.Label}
            {question.Options ?
              <select>
                {question.Options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              :<input type={question.Type}/>
            }
          </label>
        ))}
        <button className={styles.btn} >SUBMIT</button>
      </form>
    </div>
  )
}

export default Home;
