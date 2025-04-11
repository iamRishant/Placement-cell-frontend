import React, { useState } from "react";
import axios from "axios";
import { form } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import useGlobalUserObject from "../store/store";

const Login = () => {
  const setLogin=useGlobalUserObject((state)=>state.setLogin)
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    email: "", 
    password: "",
  });

  const [error, setError] = useState("");

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try { 
      const response = await axios.post(
        'http://localhost:8000/api/v1/user/login', formData);
      
      console.log('Login Successful', response.data);
      // when the user logged in successfully we will update the global state and navigate to dashboard

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("currUser",JSON.stringify(response.data.user));
      setLogin(response.data)
      navigate('/dashboard')
    } catch (errr) {
      setError(errr.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Login</h2>
      
      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChanges}
          className="w-full p-2 border rounded-md mb-3"
          placeholder="Email" 
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChanges}
          className="w-full p-2 border rounded-md mb-3"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md
           hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
