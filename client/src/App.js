import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from './Pages/Login/Login'
function App() {
  return (
    <div className="App">
     
      <Login></Login>
    </div>
  );
}

export default App;
