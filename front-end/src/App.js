import React, { useState } from 'react'
import Login from './components/Login';

function App() {
  const [user, setUser] = useState()

  return (
    <Login setUser={setUser} />
  );
}

export default App;
