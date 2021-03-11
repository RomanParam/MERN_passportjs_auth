import React from "react";
import { useParams } from 'react-router-dom';

const Contact = ({address}) => {

  const { street } = useParams();

  return <div><span className='component'> "CONTACTS: "</span>
  <p>my address is <i>{address}</i> - <b>пропс</b></p>
  <p>my street is <i>{ street }</i> - <b>useParams</b> hooks</p>
  </div>}

export default Contact