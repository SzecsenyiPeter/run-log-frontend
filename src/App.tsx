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

export enum DistanceMeasurements {
  KILOMETRES,
  MILES
}

export interface DistanceMeasurementContextInterface {
  distanceMeasurement: DistanceMeasurements
  setDistanceMeasurement: (newDistanceMeasurement: DistanceMeasurements) => void
}
export const MeasurementContext = React.createContext<DistanceMeasurementContextInterface>({
  distanceMeasurement: DistanceMeasurements.MILES,
  setDistanceMeasurement: () => undefined,
});

const App: React.FC = () => {
  const { t } = useTranslation();
  const [distanceMeasurement, setDistanceMeasurement] = useState(DistanceMeasurements.KILOMETRES);
  const value = { distanceMeasurement, setDistanceMeasurement };
  return (
    <MeasurementContext.Provider value={value}>
      <Router>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header><Header size="small" color="violet">Run Log</Header></Menu.Item>
            <Menu.Item as="a">
              <NavLink to="/list" activeStyle={{ color: 'grey' }}>{ t('menu.allRuns') }</NavLink>
            </Menu.Item>
            <Menu.Item as="a">
              <NavLink to="/add" activeStyle={{ color: 'grey' }}>{ t('menu.addRun') }</NavLink>
            </Menu.Item>
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
            <Route exact path="/">
              <Redirect to="/add" />
            </Route>
          </Switch>
        </Container>
      </Router>
    </MeasurementContext.Provider>
  );
};

export default App;
