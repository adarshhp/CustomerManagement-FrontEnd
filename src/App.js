import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from './components/Register';
import Education from './components/Education';
import PreviousExperiance from './components/PreviousExperiance';import Layout from './components/Layout';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Layout/>} >   
          <Route index element={<Dashboard/>} />
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
