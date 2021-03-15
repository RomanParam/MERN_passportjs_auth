import React from 'react';
import Main from './components/Main';
import { BrowserRouter as Router } from 'react-router-dom';
import Context from './context';

const App = () => {
  const [isAuth, setAuth] = React.useState(false);
  const [user, setUser] = React.useState('');
  const setAuthorization = (isAu = false) => {
    setAuth(isAu);
  };

  const setUserName = (name = '') => {
    setUser(name);
  };

  React.useEffect(() => {
    (async () => {
      try {
        const isAuth = await (await fetch('/api/auth/check')).json();
        setAuth(isAuth.session);
        setUser(isAuth.user);
      } catch ({ message }) {
        console.log('Err: ', message);
      }
    })();
  }, []);
  console.log('user:', user);
  console.log('isAuth:', isAuth);
  if (isAuth && user.name) alert(`Welkomin ${user.name}`)

  return (
    <Router>
      <Context.Provider
        value={{
          isAuth: isAuth,
          setAuth: setAuthorization,
          user: user,
          setUser: setUserName,
        }}
      >
        <Main />
      </Context.Provider>
    </Router>
  );
};

export default App;
