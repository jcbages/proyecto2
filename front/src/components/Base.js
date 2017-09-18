import React from 'react';
import {Link, NavLink } from "react-router-dom";
import { Route, Switch } from 'react-router-dom';
import App from '../components/App.js';
import LoginPage from '../containers/LoginPage.js';
import SignUpPage from '../containers/SignUpPage.js';



const Base = () => {
  <div>
    <Header />
    <Main />
  </div>
};

export default Base;