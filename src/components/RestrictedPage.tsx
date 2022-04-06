import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { RunLogContext, RunLogContextInterface } from '../App';

interface RestrictedPageProps {
    children: React.ReactNode;
    shouldBeLoggedIn: boolean;
    redirectTo: string;
}

const RestrictedPage: React.FC<RestrictedPageProps> = (props) => {
  const { shouldBeLoggedIn, redirectTo, children } = props;

  const {
    runLogState,
  } = useContext<RunLogContextInterface>(RunLogContext);

  return shouldBeLoggedIn === runLogState.authState.isLoggedIn ? (
    <>{children}</>
  ) : (
    <Navigate to={redirectTo} />
  );
};
export default RestrictedPage;
