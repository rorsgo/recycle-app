import React from "react";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const CreatePoint = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="RecycleApp" />
        <Link to="/">
          <FiArrowLeft />
          Back to home
        </Link>
      </header>
      <form>
        <h1>Register a collection waste point</h1>

        <fieldset>
          <legend>
            <h2>Data</h2>
            <div className="field">
              <label htmlFor="entity-name">Entity name</label>
              <input 
                type="text"
                name="entity-name"
                id="entity-name"
              />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input 
                type="text"
                name="email"
                id="email"
              />
            </div>
          </legend>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Select the map address</span>
          </legend>
          <div className="field-group">
            <div className="field">
              <label htmlFor="state">State</label>
              <select name="state" id="state">
                <option value="0">Select a state</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select name="city" id="city">
                <option value="0">Select a city</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Collection Items</h2>
            <span>Select one or more items below</span>
          </legend>
          <ul className="items-grid">
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="Kicthen Oil"/>
              <span>Kicthen Oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="Kicthen Oil"/>
              <span>Kicthen Oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="Kicthen Oil"/>
              <span>Kicthen Oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="Kicthen Oil"/>
              <span>Kicthen Oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="Kicthen Oil"/>
              <span>Kicthen Oil</span>
            </li>
            <li>
              <img src="http://localhost:3333/uploads/oil.svg" alt="Kicthen Oil"/>
              <span>Kicthen Oil</span>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Register point</button>
      </form>
    </div>
  );
};

export default CreatePoint;