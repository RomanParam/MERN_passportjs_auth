import React from "react";
import { useHistory } from "react-router-dom";
import {baseUrl} from "../../api/urls"

const SignIn = ({setAuth}) => {
  const history = useHistory();

  React.useEffect(() => {

      (async () => {
          try {
            const isAuth = await (await fetch(baseUrl + '/auth/signout')).json()
            console.log('file-SignOut.js isAuth:', isAuth);
            setAuth(isAuth.session);
          } catch ({message}) {
            console.log('Err: ', message);
            setAuth(false)
          }
        }
      )()
        history.push("/home");

  }, [])


  return (
    <div><span className='component'> SignOut</span></div>
  )

}

export default SignIn
