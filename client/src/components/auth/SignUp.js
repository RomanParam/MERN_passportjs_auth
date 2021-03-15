import React from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context';

const SignUp = () => {
  const history = useHistory();
  const { setAuth } = React.useContext(Context);
  const [isLoading, setLoading] = React.useState(false);

  const signUpHandler = async () => {
    try {
      setLoading(true);
      const isAuth = await (
        await fetch('/api/auth/signup', {
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
      setLoading(false);
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
      setLoading(false);
    }
  };
  return (
    <div>
      <span className="component">
        {' '}
        <button onClick={signUpHandler} disabled={isLoading}>
          SignUp Local
        </button>
      </span>
    </div>
  );
};

export default SignUp;
