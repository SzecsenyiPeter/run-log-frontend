import React from 'react';
import {
  Route, BrowserRouter as Router, Switch, NavLink, Redirect,
} from 'react-router-dom';
import './App.css';
import { Container, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import AddRunPage from './components/AddRunPage';
import AllRunList from './components/AllRunList';
import EditRunPage from './components/EditRunPage';

const App: React.FC = () => {
  const { t } = useTranslation();
  return (

    <Router>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>Run Log</Menu.Item>
          <Menu.Item as="a">
            <NavLink to="/list" activeStyle={{ color: 'grey' }}>{ t('menu.allRuns') }</NavLink>
          </Menu.Item>
          <Menu.Item as="a">
            <NavLink to="/add" activeStyle={{ color: 'grey' }}>{ t('menu.addRun') }</NavLink>
          </Menu.Item>
        </Container>
      </Menu>
      <Container style={{ paddingTop: '4em' }}>
        <Switch>
          <Route component={AddRunPage} exact path="/add" />
          <Route component={AllRunList} exact path="/list" />
          <Route component={EditRunPage} exact path="/edit" />
          <Route exact path="/">
            <Redirect to="/add" />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;
