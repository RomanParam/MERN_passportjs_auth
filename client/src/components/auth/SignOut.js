import React from "react";
import { useHistory } from "react-router-dom";
import {baseUrl} from "../../api/urls"

const SignIn = ({setAuth}) => {
  const history = useHistory();

  React.useEffect(() => {

      (async () => {
          try {
            const response = await fetch(baseUrl + '/auth/signout');
            console.log('resp status', response.status)
            if(response.status !== 200) return alert(response.statusText)
            const isAuth = await response.json();
            console.log('file-SignOut.js isAuth:', isAuth);
            setAuth(false);
            alert(isAuth.message)
          } catch ({message}) {
            console.log('Err: ', message);
            alert(message)
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
