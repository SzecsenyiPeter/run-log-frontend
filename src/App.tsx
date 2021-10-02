import React from 'react';
import {
  Route, BrowserRouter as Router, Switch, NavLink, Redirect,
} from 'react-router-dom';
import './App.css';
import { Container, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import RunForm from './components/RunForm';
import AllRunList from './components/AllRunList';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (

    <Router>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>Run Log</Menu.Item>
          <Menu.Item as="a">
            <NavLink to="/list" activeStyle={{ color: 'grey' }}>{ t('allRuns') }</NavLink>
          </Menu.Item>
          <Menu.Item as="a">
            <NavLink to="/add" activeStyle={{ color: 'grey' }}>{ t('addRun') }</NavLink>
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ paddingTop: '4em' }}>
        <Switch>
          <Route component={RunForm} exact path="/add" />
          <Route component={AllRunList} exact path="/list" />
          <Route exact path="/">
            <Redirect to="/add" />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
