import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';

function App() {
  const [user, setUser] = useState()

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login setUser={setUser} />
        </Route>
        <Route path="/home">
          <Home user={user} />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
