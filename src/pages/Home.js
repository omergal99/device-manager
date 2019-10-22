import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import actions from '../store/actions';


function Home() {
  // const dispatch = useDispatch();
  // const homeStore = useSelector(state => state.homeStore);

  useEffect(() => {
    // dispatch(actions.loadHomeData());
  });

  // console.log(homeStore)

  return (
    <div className="home">
      <h2>Home</h2>
    </div>
  );
}

export default React.memo(Home)