import React from 'react';
import { useHistory } from 'react-router-dom';
import { baseUrl } from '../../api/urls';

const SignUp = ({ setAuth }) => {
  const history = useHistory();

  const signUpHandler = async () => {
    try {
      const isAuth = await (
        await fetch(baseUrl + '/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Elbrus',
            email: 'elb@elb.ru',
            password: 'dasBoot',
          }),
        })
      ).json();
      setAuth(isAuth?.session);
      console.log('file-SignUp.js isAuth:', isAuth);
      if (isAuth?.err?.code === 11000)
        return alert('Пользователь с таким именем уже зарегестрирован.');
      alert(isAuth?.message);
      setTimeout(() => {
        history.push('/home');
      }, 1000);
    } catch ({ message }) {
      console.log('Err: ', message);
      alert(message);
      //setAuth(false)
    }
  };

  return (
    <div>
      <span className="component">
        {' '}
        <button onClick={signUpHandler}>SignUp</button>
      </span>
    </div>
  );
};

export default SignUp;
