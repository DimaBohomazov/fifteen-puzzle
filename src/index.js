import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {CurrentGameProvider} from "./contexts/currentGameContext";

const app = (
  <BrowserRouter>
    <CurrentGameProvider>
      <App />
    </CurrentGameProvider>
  </BrowserRouter>
)

ReactDOM.render( app, document.getElementById('root') );

