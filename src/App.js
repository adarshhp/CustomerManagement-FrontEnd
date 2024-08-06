import './App.css';
import Login from './components/Login';
//import Wrapper from './components/Wrapper';
//import PersonalForm from "./components/PersonalForm"
//import PreviousExperiance from './components/PreviousExperiance';
//import Register from './components/Register';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './components/Register';
//import PreviousExperiance from './components/PreviousExperiance';        <Route path="/" element={<PreviousExperiance />} />   

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
    //    /
    //    /register 
    //    /PreviousExperiance
  );
}

export default App;
