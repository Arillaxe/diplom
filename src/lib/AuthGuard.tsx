import { FunctionComponent } from 'react';
import { useHistory } from 'react-router-dom';

const AuthGuard: FunctionComponent<{}> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default AuthGuard;
