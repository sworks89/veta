import React from "react";
import Home from "./components/home";
import Greeting from "./components/greeting";
import { Intro } from "./components/Intro"
import Dashboard from "./components/Dashboard";
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Intro />}/>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/greeting" element={<Greeting/>}/>
      </Routes>
    </Router>
    );
}

export default App;