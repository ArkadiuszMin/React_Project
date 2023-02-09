import MainComponent from "./components/Main";
import NavbarComponent from "./components/navbar";
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom'
function App() {
  return (
    <div>
      <Router>
        <NavbarComponent/>
        <MainComponent/>
      </Router>
    </div>
  );
}

export default App;
