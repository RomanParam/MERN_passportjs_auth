import React from 'react';
import Main from './components/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import {baseUrl} from "./api/urls";

const App = () => {
  const [isAuth, setAuth] = React.useState(false);
  const [user, setUser] = React.useState('');
  const setAuthorization = (isAu = false) => {
    setAuth(isAu);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const isAuth = await (await fetch(baseUrl + '/auth/check')).json();
        setAuth(isAuth.session);
        setUser(isAuth.user)
      } catch ({ message }) {
        console.log('Err: ', message);
        setAuth(false);
      }
    })();
  }, []);
  console.log('file-App.js isAuth:', isAuth);
  console.log('file-App.js user:', user);
  return (
    <Router>
      <Main isAuth={isAuth} setAuth={setAuthorization}/>
    </Router>
  );
};

export default App;
