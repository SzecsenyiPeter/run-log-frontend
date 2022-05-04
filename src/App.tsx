import React, { useState } from 'react';
import {
  Route, BrowserRouter as Router, Routes, NavLink, Navigate,
} from 'react-router-dom';
import './App.css';
import { Container, Header, Menu } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { toast, ToastContainer } from 'react-toastify';
import AddRunPage from './components/AddRunPage';
import AllRunList from './components/AllRunList';
import EditRunPage from './components/EditRunPage';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import { UserTypes } from './domain/RegisterUser';
import RestrictedPage from './components/RestrictedPage';
import 'react-toastify/dist/ReactToastify.css';
import CreateRunPlanPage from './components/CreateRunPlanPage';

export enum DistanceMeasurements {
  KILOMETRES,
  MILES
}

export interface AuthState {
  username: string;
  userType: UserTypes;
  isLoggedIn: boolean;
}

export enum NotificationTypes {
  SUCCESS,
  ERROR
}

export interface RunLogState {
  distanceMeasurement: DistanceMeasurements;
  authState: AuthState;
  triggerNotification: (message: string, type: NotificationTypes) => void;
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
    triggerNotification: () => undefined,
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
    triggerNotification: (message: string, type: NotificationTypes) => {
      switch (type) {
        case NotificationTypes.ERROR:
          toast.error(message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        case NotificationTypes.SUCCESS:
          toast.success(message, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;
        default:
          break;
      }
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
                <NavLink to="/list" style={({ isActive }) => ({ color: isActive ? 'grey' : 'inherit' })}>{t('menu.allRuns')}</NavLink>
              </Menu.Item>
              <Menu.Item as="a">
                <NavLink to="/add" style={({ isActive }) => ({ color: isActive ? 'grey' : 'inherit' })}>{t('menu.addRun')}</NavLink>
              </Menu.Item>
              <Menu.Item as="a">
                <NavLink to="/create-run-plan" style={({ isActive }) => ({ color: isActive ? 'grey' : 'inherit' })}>{t('menu.createRunPlan')}</NavLink>
              </Menu.Item>
            </>
            )}
            {!runLogState.authState.isLoggedIn
            && (
            <>
              <Menu.Item as="a">
                <NavLink to="/register" style={({ isActive }) => ({ color: isActive ? 'grey' : 'inherit' })}>{t('menu.register')}</NavLink>
              </Menu.Item>
              <Menu.Item as="a">
                <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'grey' : 'inherit' })}>{t('menu.login')}</NavLink>
              </Menu.Item>
            </>
            )}
          </Container>
        </Menu>
        <Container style={{
          paddingTop: '4em', paddingBottom: '2em', paddingRight: '2em', paddingLeft: '2em', backgroundColor: 'whiteSmoke', border: '4px whiteSmoke solid', borderRadius: '8px',
        }}
        >
          <Routes>
            <Route element={<RestrictedPage shouldBeLoggedIn redirectTo="/login"><AddRunPage /></RestrictedPage>} path="/add" />
            <Route element={<RestrictedPage shouldBeLoggedIn redirectTo="/login"><AllRunList userToShow={null} /></RestrictedPage>} path="/list" />
            <Route element={<RestrictedPage shouldBeLoggedIn redirectTo="/login"><EditRunPage /></RestrictedPage>} path="/edit" />
            <Route element={<RestrictedPage shouldBeLoggedIn redirectTo="/login"><CreateRunPlanPage /></RestrictedPage>} path="/create-run-plan" />
            <Route element={<RestrictedPage shouldBeLoggedIn={false} redirectTo="/list"><RegisterPage /></RestrictedPage>} path="/register" />
            <Route element={<RestrictedPage shouldBeLoggedIn={false} redirectTo="/list"><LoginPage /></RestrictedPage>} path="/login" />
            <Route path="/" element={<Navigate replace to="/home" />} />
          </Routes>
        </Container>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </RunLogContext.Provider>
  );
};

export default App;
