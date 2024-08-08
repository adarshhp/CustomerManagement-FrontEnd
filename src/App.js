import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './components/Register';
import Education from './components/Education';
import PreviousExperiance from './components/PreviousExperiance';        <Route path="/" element={<PreviousExperiance />} />   

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Login/>} />   
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
