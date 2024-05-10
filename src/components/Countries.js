import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";

const Countries = () => {
  //n'autorise la modif de data qu'à travers un useState
  const [data, setData] = useState([]);
  const [rangeValue, setRangeValue] = useState(36);
  const [selectedRadio, setSelectedRadio] = useState("");
  const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

  //Le useEffect se joue lorsque le composant est monté, le [] correspond au callback
  useEffect(() => {
    //fetch
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="countries">
      <ul className="radio-container">
        <input
          type="range"
          min="1"
          max="250"
          defaultValue={rangeValue}
          onChange={(e) => setRangeValue(e.target.value)} //permet de dire que le range  doit afficher le nombre de pays définit par la modification de sa rangeValue
        />
        {radios.map((continent) => (
          <li>
            <input
              type="radio"
              id={continent}
              name="continentRadio"
              checked={continent === selectedRadio}
              onChange={(e) => setSelectedRadio(e.target.id)}
            />
            <label htmlFor={continent}>{continent}</label>
          </li>
        ))}
      </ul>
      {selectedRadio && (
        <button onClick={() => setSelectedRadio("")}>
          Annuler la recherche
        </button>
      )}
      <ul>
        {data
          .filter((country) => country.continents[0].includes(selectedRadio)) // tableau sur 0 car la 1ère valeur du tableau va correspond au continent associé au pays
          .sort((a, b) => b.population - a.population)
          .slice(0, rangeValue)
          .map(
            (
              country,
              index //le slice permet de modifier le nombre de pays affiché
            ) => (
              <Card key={index} country={country} />
            )
          )}
      </ul>
    </div>
  );
};

export default Countries;
