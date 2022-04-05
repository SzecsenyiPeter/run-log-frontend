import React, { useState } from 'react';
import {
  Route, BrowserRouter as Router, Switch, NavLink, Redirect,
} from 'react-router-dom';
import './App.css';
import { Container, Header, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import AddRunPage from './components/AddRunPage';
import AllRunList from './components/AllRunList';
import EditRunPage from './components/EditRunPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import { UserTypes } from './domain/RegisterUser';

export enum DistanceMeasurements {
  KILOMETRES,
  MILES
}

export interface AuthState {
  username: string;
  userType: UserTypes;
  isLoggedIn: boolean;
}

export interface RunLogState {
  distanceMeasurement: DistanceMeasurements;
  authState: AuthState;
}
export interface RunLogContextInterface {
  runLogState: RunLogState;
  setRunLogState: (newRunLogState: RunLogState) => void
}

export const RunLogContext = React.createContext<RunLogContextInterface>({
  runLogState: {
    distanceMeasurement: DistanceMeasurements.KILOMETRES,
    authState: {
      username: '',
      userType: UserTypes.ATHLETE,
      isLoggedIn: false,
    },
  },
  setRunLogState: () => undefined,
});

const App: React.FC = () => {
  const { t } = useTranslation();
  const [runLogState, setRunLogState] = useState({
    distanceMeasurement: DistanceMeasurements.KILOMETRES,
    authState: {
      username: '',
      userType: UserTypes.ATHLETE,
      isLoggedIn: false,
    },
  });
  const value = { runLogState, setRunLogState };
  return (
    <RunLogContext.Provider value={value}>
      <Router>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header><Header size="small" color="violet">Run Log</Header></Menu.Item>
            {runLogState.authState.isLoggedIn
            && (
            <>
              <Menu.Item as="a">
                <NavLink to="/list" activeStyle={{ color: 'grey' }}>{t('menu.allRuns')}</NavLink>
              </Menu.Item>
              <Menu.Item as="a">
                <NavLink to="/add" activeStyle={{ color: 'grey' }}>{t('menu.addRun')}</NavLink>
              </Menu.Item>
            </>
            )}
            {!runLogState.authState.isLoggedIn
            && (
            <>
              <Menu.Item as="a">
                <NavLink to="/register" activeStyle={{ color: 'grey' }}>{t('menu.register')}</NavLink>
              </Menu.Item>
              <Menu.Item as="a">
                <NavLink to="/login" activeStyle={{ color: 'grey' }}>{t('menu.login')}</NavLink>
              </Menu.Item>
            </>
            )}
          </Container>
        </Menu>
        <Container style={{
          paddingTop: '4em', paddingBottom: '2em', paddingRight: '2em', paddingLeft: '2em', backgroundColor: 'whiteSmoke', border: '4px whiteSmoke solid', borderRadius: '8px',
        }}
        >
          <Switch>
            <Route component={AddRunPage} exact path="/add" />
            <Route component={AllRunList} exact path="/list" />
            <Route component={EditRunPage} exact path="/edit" />
            <Route component={RegisterPage} exact path="/register" />
            <Route component={LoginPage} exact path="/login" />
            <Route exact path="/">
              <Redirect to="/list" />
            </Route>
          </Switch>
        </Container>
      </Router>
    </RunLogContext.Provider>
  );
};

export default App;
