import React from 'react';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../../api/urls';

const SignIn = ({ setAuth }) => {
  const history = useHistory();

  const loginHandler = async () => {
    try {
      const res = await fetch(baseUrl + '/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'elb@elb.ru', password: 'dasBoot' }),
      });
      console.log(res);
      if(res.status !== 200) return alert(res.statusText);
      const isAuth = await res.json();
      setAuth(isAuth?.session);
      console.log('file-SignIn.js isAuth:', isAuth);
      alert(isAuth?.message);
      setTimeout(() => {
        history.push('/home');
      }, 500);
    } catch ({ message }) {
      console.log('Err: ', message);
      alert(message)
    }
  };

  return (
    <div>
      <span className="component">
        {' '}
        <button onClick={loginHandler}>Local Strategy</button>
      </span>
    </div>
  );
};

export default SignIn;
