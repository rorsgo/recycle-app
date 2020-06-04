import React from 'react';
import logo from "../../assets/logo.svg";
import "./styles.css";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="RecycleApp"></img>
        </header>
        <main>
          <h1>Your collection waste localized.</h1>
          <p>We help people find collection points efficiently.</p>

          <Link to="/register-point">
            <span>
              <FiLogIn />
            </span>
            <strong>Register collection point</strong>
          </Link>
        </main>
      </div>
    </div>
  )
}

export default Home;