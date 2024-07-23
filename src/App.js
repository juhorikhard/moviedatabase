import React, { useState } from "react";
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";
import axios from "axios";

function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const apiurl = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}`;


  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let result = data.Search || [];
        setState(prevState => ({
          ...prevState,
          results: result
        }));
      }).catch(error => {
        console.error("Error fetching data: ", error);
        setState(prevState => ({
          ...prevState,
          results: []
        }));
      });
    }
  };

  const handleInput = (e) => {
    let s = e.target.value;
    setState(prevState => ({
      ...prevState,
      s: s
    }));
  };

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
      setState(prevState => ({
        ...prevState,
        selected: result
      }));
    }).catch(error => {
      console.error("Error fetching data: ", error);
    });
  };

  const closePopup = () => {
    setState(prevState => ({
      ...prevState,
      selected: {}
    }));
  };

  return (
    <div className="App">
      <header>
        <h1>Movie Database</h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search} />
        <Results results={state.results} openPopup={openPopup} />
        {state.selected.Title && <Popup selected={state.selected} closePopup={closePopup} />}
      </main>
    </div>
  );
}

export default App;