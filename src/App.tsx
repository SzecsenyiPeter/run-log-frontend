import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import RunForm from './components/RunForm';
import AllRunList from './components/AllRunList';

const AppStyle = {
  width: '80%',
  margin: 'auto',
};

const App: React.FC = () => (
  <Router>
    <div className="App" style={AppStyle}>
      <Switch>
        <Route component={RunForm} exact path="/" />
        <Route component={AllRunList} exact path="/list" />
      </Switch>
    </div>
  </Router>
);

export default App;
