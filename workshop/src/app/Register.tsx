import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({ username: '', password: '', country: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.username || !form.password || !form.country) {
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

  const handleRegister = async () => {
    if (!validateForm()) {
        return;
      }
    setLoading(true);
    try {
      await axios.post('http://192.168.22.145:8000/user/registration/', form);
      alert('Registration successful!');
      navigate("/login");
    } catch (err) {
      alert(`Registration failed - ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-5 items-center justify-center h-screen w-full'>
      <h1 className='text-3xl font-bold'>Register</h1>
      <div className='flex flex-col items-center gap-1'>

        {/* Country */}
        <div className='w-full'>
          <label className="select">
            <span className="label">Country</span>
            <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Select a country</option>
              <option value="Philippines">Philippines</option>
              <option value="China">China</option>
            </select>
          </label>
        </div>

        {/* Username */}
        <label className="input validator">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength={3}
            maxLength={30}
            value={form.username}
            onChange={handleChange}
          />
        </label>
        <p className="validator-hint hidden">
            Must be 3 to 30 characters
            <br/>containing only letters, numbers or dash
        </p>

        {/* Password */}
        <label className="input validator">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            value={form.password}
            onChange={handleChange}
          />
        </label>
        <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br/>At least one number
            <br/>At least one lowercase letter
            <br/>At least one uppercase letter
        </p>

        {/* Register Button */}
        <button className='btn' onClick={handleRegister} disabled={loading}>
          {loading ? <span className="loading loading-dots loading-xs"></span>: "Register"}
        </button>

      </div>
    </div>
  );
};

export default Register;
