import React from 'react';
import { baseUrl } from '../api/urls';

const Private = ({setAuth}) => {
  const delHandler = async () => {
    try {
      await fetch('/api/auth/del', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAuth(false);
    } catch ({ message }) {
      console.log('Err: ', message);
      alert(message);
    }
  };
  return (
    <div>
      <span className="component">
        "PRIVATE"
        <button onClick={delHandler}>DeleteAllUsers</button>
      </span>
    </div>
  );
};

export default Private;
