import MainComponent from "./components/Main";
import NavbarComponent from "./components/navbar";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
import { createContext, useState } from "react";

export const logedContext = createContext();

function App() {
  const [loged, setLoged] = useState(false);
  return (
      <Router>
        <logedContext.Provider value = {{loged, setLoged}}>
          <NavbarComponent/>
          <MainComponent/>
        </logedContext.Provider>
      </Router>
  );
}

export default App;
