import React from 'react'
import {Switch, Route} from 'react-router-dom'
import './assets/stylesheets/index.scss'

import Home from "./pages/Home/Home";
import Puzzle from "./pages/Puzzle/Puzzle";
import Rating from "./pages/Rating/Rating";

const App = () => {
  return (
    <Switch>
      <Route path='/puzzle' component={Puzzle}/>
      <Route path='/rating' component={Rating}/>
      <Route path='/' component={Home} exact/>
    </Switch>
  );
}

export default App;
