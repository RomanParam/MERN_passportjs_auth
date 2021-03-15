import React from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../../context';
import { baseUrl } from '../../api/urls';

const SignIn = () => {
  const history = useHistory();
  const { setAuth, setUser } = React.useContext(Context);
  const [ loading, setLoading ] = React.useState(false);

  const loginHandler = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'elb@elb.ru', password: 'dasBoot' }),
      });
      if (res.status !== 200) {
        setLoading(false);
        return alert(res.statusText);
      }
      const isAuth = await res.json();
      setUser(isAuth.user.name);
      setAuth(isAuth?.session);
      alert(isAuth?.message);
      setLoading(false);
      setTimeout(() => {
        history.push('/home');
      }, 500);
    } catch ({ message }) {
      console.log('Err: ', message);
      setLoading(false);
      alert(message);
    }
  };

  const vkHandler = () => {
    setLoading(true);
    location.href = `${baseUrl}/api/auth/vkontakte`;
  };

  const googleHandler = () => {
    setLoading(true);
    location.href = `${baseUrl}/api/auth/google`;
  };

  return (
    <div>
      <span className="component">
        <button onClick={loginHandler} disabled={loading}>Local auth strategy</button>
        <button onClick={vkHandler} disabled={loading}>VK auth strategy</button>
        <button onClick={googleHandler} disabled={loading}>Google auth strategy</button>
        {/*<a href={`${baseUrl}/api/auth/vkontakte`} >LoginWithVK</a>*/}
        {/*<a href={`${baseUrl}/api/auth/google`} >LoginWithGoogle</a>*/}
      </span>
    </div>
  );
};

export default SignIn;
