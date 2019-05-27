import React, { Component } from "react";
import "../NavBar.css";
import { Link, Router } from "react-router-dom";

class NavBar extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <div className="row no-gutters">
          <div className="col-sm-auto">
            <a href="/">
              <h1>Hebrew.</h1>
            </a>
          </div>
          <div className="col-sm-auto">
            <nav>
              <ul>
                <li>
                  <Link to="/alphabet">Alphabet</Link>
                </li>
                <li>
                  <Link to="/dictionary">Dictionary</Link>
                </li>
                <li>
                  <Link to="/lessons">Lessons</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;

{
  /* <li>
<a href="/alphabet">Alphabet</a>
</li>
<li>
<a href="/dictionary">Dictionary</a>
</li>
<li>
<a href="/lessons">Lessons</a>
</li> */
}
