import React from 'react';
import logo from "../../assets/logo.svg";
import "./styles.css";
import { FiLogIn } from "react-icons/fi";

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

          <a href="/register">
            <span>
              <FiLogIn />
            </span>
            <strong>Register collection point</strong>
          </a>
        </main>
      </div>
    </div>
  )
}

export default Home;