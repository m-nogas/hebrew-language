import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dictionary from "./components/Dictionary";
import Alphabet from "./components/Alphabet";
import Lessons from "./components/Lessons";

function App() {
  return (
    <Router>
      <NavBar />
      <Route path="/alphabet" component={Alphabet} />
      <Route path="/dictionary" component={Dictionary} />
      <Route path="/lessons" component={Lessons} />
      <main className="container" />
    </Router>
  );
}

export default App;

// div().container-fluid
// div().row
//   div.col-sm-auto
//     a(href="/").home
//       h1 Hebrew.
//   div.col-sm-auto
//     div.row.menu
//       a(href="/alphabet")
//         h4 Alphabet
//     div.row
//       a(href="/dictionary")
//         h4 Dictionary
//     div.row
//       a(href="/lessons")
//         h4 Lessons
