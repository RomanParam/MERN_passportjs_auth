import React from "react";
import Main from "./components/Main";
import {BrowserRouter as Router} from "react-router-dom";

const App = () => {

  const [isAuth, setAuth] = React.useState(false);

  const setAuthorization = (isAu) => {
    setAuth(isAu);
  }

  React.useEffect(() => {
    (async () => {
        try {
          const isAuth = await (await fetch(baseUrl + '/auth/check')).json()
          setAuth(isAuth.session);
        } catch ({message}) {
          console.log('Err: ', message);
          setAuth(false)
        }
      }
    )()
  }, [])
  console.log('file-App.js isAuth:', isAuth);
  return (
    <Router >
      <Main isAuth={isAuth} setAuth={setAuthorization}/>
    </Router>
  );
}

export default App;
