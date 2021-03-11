import React from "react";
import { useHistory } from "react-router-dom";

const Home = () => {

  const history = useHistory();

  const [getBack, setBack] = React.useState(false);

  React.useEffect(() => {
    console.log('Home Mounted');
    return () => {console.log('Home Unmounted')}
  }, [])

  React.useEffect(() => {
    console.log('Home Updated');
  }, [getBack])

  if (getBack) {
    setTimeout(() => {
      // history.push("/about"); //редирект на /about
      history.goBack();
    }, 1000);
  }

  return (
    <div>
      <span className='component'> "HOME"</span>
      <div>useHistory hook</div>
      {getBack && " going Back..."}
      {!getBack && <button onClick={() => {setBack(true)}}> GetBack </button>}
    </div>
  );
};

export default Home;
