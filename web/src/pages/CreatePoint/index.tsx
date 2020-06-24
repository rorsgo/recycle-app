import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import axios from "axios";
import api from "../../services/api";

import Dropzone from "../../components/Dropzone";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEStateResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const CreatePoint = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [cityName, setCityName] = useState<string[]>([]);
  const [stateInitials, setStateInitials] = useState<string[]>([]);
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [selectedState, setSelectedState] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");
  const [inputedZipCode, setZipCode] = useState("0");
  const [selectedFile, setSelectedFile] = useState<File>();
  const history = useHistory();


  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(position => {
  //     const { latitude, longitude } = position.coords;

  //     setInitialPosition([latitude, longitude]);
  //   });
  // }, []);

  useEffect(() => {
    api.get("items")
      .then(response => {
        setItems(response.data);
      })
  }, []);

  // useEffect(() => {

  // }, [handleLocation])

  useEffect(() => {
    axios.get<IBGEStateResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then(response => {
        const stateInitials = response.data.map(state => state.sigla);
        const alphabeticStateInitials = stateInitials.sort();
        setStateInitials(alphabeticStateInitials);
      })
  }, []);

  useEffect(() => {
    if (selectedState === "0") {
      return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`)
      .then(response => {
        const citiesName = response.data.map(city => city.nome);
        setCityName(citiesName);
      })
  }, [selectedState]);

  function handleSelectState(event: ChangeEvent<HTMLSelectElement>) {
    const stateInitial = event.target.value;
    setSelectedState(stateInitial);
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
    const cityName = event.target.value;
    setSelectedCity(cityName);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ]);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleZipCode(event: ChangeEvent<HTMLInputElement>) {
    const zipCode = event.target.value;
    setZipCode(zipCode);
  }

  function handleSelectItem(id: number) {
    const alreadySelectedItems = selectedItems.findIndex(item => item === id);

    if (alreadySelectedItems >= 0) {
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  }

  async function handleLocation(event: FormEvent) {
    event.preventDefault();
    const zipCode = inputedZipCode;
    const state = selectedState;
    const city = selectedCity;

    const data = {
      zipCode,
      state,
      city
    }

    const location = await api.post("location", data);
    setInitialPosition([location.data.latitude, location.data.longitude]);
    setSelectedPosition([location.data.latitude, location.data.longitude]);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email } = formData;
    const state = selectedState;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = new FormData();
    data.append("name", name);
    data.append("email", email);
    data.append("state", state);
    data.append("city", city);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("items", items.join(","));
    if (selectedFile) {
      data.append("image", selectedFile)
    }

    await api.post("points", data);
    alert("Point Regitered!");
    history.push("/");
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="RecycleApp" />
        <Link to="/">
          <FiArrowLeft />
          Back to home
        </Link>
      </header>
      <form onSubmit={handleSubmit}>
        <h1>Register a collection waste point</h1>
        <Dropzone onFileUploaded={setSelectedFile} />
        <fieldset>
          <legend>
            <h2>Data</h2>
            <span>Fill the blanks with the point waste information</span>
          </legend>
          <div className="field">
            <label htmlFor="name">Entity name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <input
              type="text"
              name="email"
              id="email"
              onChange={handleInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Address</h2>
            <span>Fill the map address</span>
          </legend>
          <div className="field-group">
            <div className="field">
              <label htmlFor="state">State</label>
              <select name="state" id="state" value={selectedState} onChange={handleSelectState}>
                <option value="0">Select a state</option>
                {stateInitials.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}>
                <option value="0">Select a city</option>
                {cityName.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="zipcode">ZipCode</label>
              <input
                type="text"
                maxLength={8}
                name="zipcode"
                id="zipcode"
                onChange={handleZipCode}
              />
            </div>
            <div className="field">
              <button type="submit" onClick={handleLocation}>Load</button>
            </div>
          </div>
          <legend>
            <span>Navigate and select a specific location on the map</span>
          </legend>
          <Map center={initialPosition} zoom={16} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={selectedPosition} />
          </Map>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Collection Items</h2>
            <span>Select one or more items below</span>
          </legend>
          <ul className="items-grid">
            {items.map(item => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? "selected" : ""}>
                <img src={item.image_url} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>
        <button type="submit">Register point</button>
      </form>
    </div >
  );
};

export default CreatePoint;