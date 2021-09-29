import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import { RunForm } from "./components/run-form";

const App: React.FC = () => {
  return (
      <Router>
          <div className="App">
              <Switch>
                  <Route component={ RunForm } exact path="/" />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
