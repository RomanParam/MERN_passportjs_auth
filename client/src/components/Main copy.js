import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import About from './About';
import Contact from './Contact';
import Always from './Always';
import Home from './Home';
import Private from './Private';
import Page404 from './Page404';
import ClassComponent from './ClassComponent';

const Main = () => {

  // const isAuth = useSelector((state) => state.auth.isLoggedIn); // или isAuth прилетает из внешнего хранилища (redux)
  const isAuth = true;

  return (
    <div className='wrapper'>
      Hola React Router <br />
      <Link to='/'>Home</Link>
      <Link to='/about'>ABOUT</Link>
      <Link to='/contact/Neglinka'>CONTACT</Link>
      <Link to='/component'>CLASS_COMP</Link>
      {isAuth && <Link to='/private'>PRIVATE</Link>}

      <Switch>
        <Route exact path='/'> <Redirect to='/home' />{' '} </Route>
        <Route exact path='/home'><Home /></Route>
        <Route exact path='/about'><About /></Route>
        <Route exact path='/component'><ClassComponent hello={'hello again'} /></Route>
        <Route exact path='/contact/:street'><Contact address={'Moscow'} /> </Route>
        <PrivateRoute path='/private' isAuth={isAuth}><Private /></PrivateRoute>
       
        <Route path='/'><Page404 /></Route>
      </Switch>
    </div>
  );
};

function PrivateRoute({ children, isAuth, ...rest }) {
  return (
    <Route path={rest.path}>
      {
        isAuth 
        ? (children) //в children (зарезервырованная переменная компонента) прилетает компонент Private и рендериться если isAuth - true
        : <Redirect to={{ pathname: '/home', state: { from: rest.location } }} /> //иначе редирект на /home
      }
    </Route>
  );
}

export default Main;
