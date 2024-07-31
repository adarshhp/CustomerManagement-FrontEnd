import React, { useEffect, useState } from 'react'
import enxclLogo from '../assets/enxcl.png'
import "./Login.css";
import RefreshIcon from '@mui/icons-material/Refresh';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function Login() {
  const notify = () => toast(statusMessage);
  const nav = useNavigate();
  const generateRandomString = (length) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  };

  const [captchaText, setCaptchaText] = useState(generateRandomString(6)); // Adjust the length as needed

  const regenerateCaptcha = () => {
    setCaptchaText(generateRandomString(6)); // Regenerate with new random string
  };


  console.log(captchaText, "==========");
  const [loginInfo, setloginInfo] = useState({ email: "", password: "" });
  const [captcha, setCaptcha] = useState("")
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  async function submitHandler(e) {
    e.preventDefault();
   
    if (captchaText == captcha) {
      const response = await fetch('http://192.168.2.83:5003/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo)
      });
      const data = await response.json()
      console.log(data);
      setStatusMessage(await data.message);
      if (data.token != null) {
        localStorage.setItem('token', data.token);
        nav("/register");
      }
    } else {
      toast('Invalid Captcha');
      
    }
  }
  function changeHandler(e) {
    const { value } = e.target
    setCaptcha(value);
  }
  function changehandler(e) {
    const { name, value } = e.target
    setloginInfo({ ...loginInfo, [name]: value });
  }

  const handleChange = (e) => {
    setEmail(e.target.value);
    setloginInfo({ ...loginInfo, 'email': e.target.value });
  };
useEffect(() => {
  if (validateEmail(email)||email=='') {
    setError('');
  } else {
    setError('Invalid email address');
  }
}, [email])

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };

return (
  <div className='loginscreen'>
  <div>
    <div> <img src={enxclLogo} alt="logo" height='118px' class='loo' /></div>
    <h3 className='head' >Time Sheet Management System</h3>
    <form className='container' onSubmit={submitHandler} >
      <div>
        <div><input name='email' placeholder='Email'  className='mail' value={loginInfo.email}  onChange={handleChange} autocomplete="off" list="autocompleteOff" required ></input><br />
        {error &&  <p style={{ color: 'white',fontSize:'15px'}}>{error}</p>}
          <input name='password' placeholder='Password' type='password' className='mail' minlength="8" value={loginInfo.password} onChange={changehandler} autocomplete="off" list="autocompleteOff" required></input><br /></div>
        <div>
          <div className='tcha'>{captchaText}</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input placeholder='Enter Captcha  text' type='text' id="captcha-form" required onChange={changeHandler} value={captcha}></input> <span onClick={regenerateCaptcha}> < RefreshIcon /></span>
          
          </div>
        </div>
        {/* <button className='captcha-refresh'type="button" >   </button> */}

        <button className='mil' type="submit" onClick={notify}>Login</button>
        <ToastContainer />
      </div>
    </form>
    {/* {statusMessage != null && (
      <Model confirmHandler={confirmfunc} message={statusMessage} />
    )}*/}

  </div>
  </div>
)
};
export default Login;
