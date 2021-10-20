import React from "react";
import { Route, Switch } from 'react-router-dom';

import Browser from '../Browser';



const Main = () => {



  return (
    <main>
      <Switch>
        <Route to='/' component={Browser} exact />
      </Switch>
    </main>
  );
};

export default Main;
