import React from "react";
import { useHistory } from "react-router-dom";
import {baseUrl} from "../../api/urls"

const SignIn = ({setAuth}) => {
  const history = useHistory();

  const loginHandler = async () => {
      try {
        const isAuth = await (await fetch(baseUrl + '/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({name: 'Zzzzz', password: 'qwertyui'})
        })).json()
        setAuth(isAuth.session);
        console.log('file-SignIn.js isAuth:', isAuth);
        alert(isAuth.message);
        setTimeout(() => {
          history.push("/home");
        }, 1000);
      } catch ({message}) {
        console.log('Err: ', message);
        setAuth(false)
      }
    }



  return (
    <div><span className='component'> <button onClick={loginHandler}>SignIn</button></span></div>
  )

}

export default SignIn
