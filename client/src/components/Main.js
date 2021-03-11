import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import About from './About';
import Contact from './Contact';
import Private from './Private';
import Page404 from './Page404';
import ClassComponent from './ClassComponent';
import Home from './Home';
import SignIn from "./auth/SignIn"
import SignOut from "./auth/SignOut"
import SignUp from "./auth/SignUp"

const Main = ({isAuth, setAuth}) => {

  return (
    <div className='wrapper'>
      {console.log('Rendered')}
      Hola React Router <br />
      {/* <a href='/'>Home</a> */}
      <Link to='/'>Home</Link>
      <Link to='/about'>ABOUT</Link>
      <Link to='/contact/Neglinka'>CONTACT</Link>
      <Link to='/component'>CLASS_COMP</Link>
      {isAuth && <Link to='/private'>PRIVATE</Link>}
      {!isAuth && <Link to='/signin'>SignIn</Link>}
      {!isAuth && <Link to='/signup'>SignUp</Link>}
      {isAuth && <Link to='/signout'>SignOut</Link>}

      <Switch>
        <Route exact path='/'> <Redirect to='/home' /> </Route>

        <Route exact path='/home'> <Home /> </Route>

        <Route exact path='/about'> <About /> </Route>

        <Route exact path='/component'> <ClassComponent hello={'hello again'} /> </Route>

        <Route exact path='/contact/:street'> <Contact address={'Inner Mongolia'} /> </Route>

        <Route exact path='/signup'> <SignUp setAuth={setAuth}/> </Route>
        <Route exact path='/signin'> <SignIn setAuth={setAuth}/> </Route>
        <Route exact path='/signout'> <SignOut setAuth={setAuth}/> </Route>

        <PrivateRoute path='/private' isAuth={isAuth}> <Private /> </PrivateRoute>

        <Route path='/'> <Page404 /> </Route>
      </Switch>
    </div>
  );
};

function PrivateRoute({ children, isAuth, ...rest42 }) {
  console.log(rest42);
  return (
    <Route path={rest42.path}>
      {
        (isAuth)
        ? (children) //в children (зарезервырованная переменная компонента) прилетает компонент Private и рендериться если isAuth - true
        : <Redirect to={{ pathname: '/home' }} /> //иначе редирект на /home
      }
    </Route>
  );
}

export default Main;
