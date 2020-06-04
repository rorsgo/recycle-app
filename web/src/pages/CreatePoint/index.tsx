import React, { useEffect, useState } from "react";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import api from "../../services/api";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    api.get("items")
      .then(response => {
        setItems(response.data);
      })
  }, []);
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
          <Map center={[-23.5630994, -46.6565712]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[-23.5630994, -46.6565712]} />
          </Map>
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
            {items.map(item => (
              <li key={item.id}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Register point</button>
      </form>
    </div>
  );
};

export default CreatePoint;