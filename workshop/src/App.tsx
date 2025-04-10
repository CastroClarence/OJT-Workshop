import './App.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";

function App() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const goToDashboard = () => {
      navigate("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.username || !form.password) {
      alert('All fields are required!');
      return false;
    }
  
    const passwordPattern = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (!passwordPattern.test(form.password)) {
      alert('Password must be at least 8 characters long and include at least one number, one lowercase letter, and one uppercase letter.');
      return false;
    }
  
    return true;
  };



  const handleLogin = async () => {
    if (!validateForm()) {
        return;
      }
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.22.145:8000/user/token/', form);
      const getCountry = await axios.post('http://192.168.22.145:8000/user/login/', form);
      console.log(getCountry);
      const userCountry = getCountry.data['country'];
      localStorage.setItem("country", userCountry)
      alert('Login successful!');
      const accessToken = response.data['access'];
      if (accessToken != null){
        goToDashboard();
      };
    } catch (err) {
      alert(`Login failed - ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='flex flex-col gap-5  items-center justify-center h-screen w-full'>
      <h1>
        <h1 className='text-3xl font-bold'>Welcome to CAIST Workshop</h1>
      </h1>
      <div className='flex flex-col items-center gap-1'>
        {/* Login Form Container */}
        <div className=' p-0 m-0'>
          {/* Username */}
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g></svg>
            <input type="input" name="username" onChange={handleChange} required placeholder="Username" pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30" title="Only letters, numbers or dash" />
          </label>
          <p className="validator-hint hidden">
            Must be 3 to 30 characters
            <br/>containing only letters, numbers or dash
          </p>
        </div>
        <div className='w-full'>
          {/* Password */}
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g></svg>
            <input type="password" name="password" onChange={handleChange} required placeholder="Password" minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br/>At least one number
            <br/>At least one lowercase letter
            <br/>At least one uppercase letter
          </p>
        </div>
        <div className='text-sm self-end'>
          <span>
            New to CAIST? <Link to="/register" className="link">Register Here</Link>
          </span>
        </div>
        <button className='btn' onClick={handleLogin} disabled={loading}>
          {loading ? <span className="loading loading-dots loading-xs"></span>: "Login"}
        </button>
      </div>
    </div>
    </>
  )
}

export default App;
