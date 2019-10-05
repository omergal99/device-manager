import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import actions from '../store/actions';

import Main from '../cmps/Main';

function Home() {
  // const dispatch = useDispatch();
  // const homeStore = useSelector(state => state.homeStore);

  useEffect(() => {
    // dispatch(actions.loadHomeData());
  });

  // console.log(homeStore)

  return (
    <div className="home">
      <h1>Device Manager</h1>
      <Main />
    </div>
  );
}

export default React.memo(Home)