import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    resume: null,
  });
  const [resumeName, setResumeName] = useState("No file chosen");

  const [error, setError] = useState("");

  const handleChanges = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({
        ...prevState,
        resume: files[0],
      }));
      setResumeName(files[0] ? files[0].name : "No file chosen");
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    if (loading) return; // this will avoid multiple signup clicks
    
    e.preventDefault();
    setError("");
    setLoading(true)

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.resume
    ) {
      setError("All fields including resume are necessary.");
      setLoading(false);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("resume", formData.resume);

      const response = await fetch("http://localhost:8000/api/v1/user/signup", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      alert("User registered successfully.");
      

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "student",
        resume: null,

        // after registration navigate to login page
      });
      navigate("/login")
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center">Signup</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChanges}
          className="w-full p-2 border rounded-md mb-3"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChanges}
          className="w-full p-2 border rounded-md mb-3"
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
        <select
          name="role"
          value={formData.role}
          onChange={handleChanges}
          className="w-full p-2 border rounded-md mb-3"
        >
          <option value="student">Student</option>
          <option value="admin">Admin</option>
        </select>
        <label className="w-full p-2 border rounded-md mb-3 flex items-center cursor-pointer bg-gray-100 hover:bg-gray-200">
          <span className="text-gray-700 flex-1">{resumeName}</span>
          <input
            type="file"
            name="resume"
            onChange={handleChanges}
            className="hidden"
            required
            disabled={loading}
          />
        </label>
        <button
          type="submit"
          className={`w-full ${!loading ?"bg-blue-500":"bg-slate-500"} text-white p-2 rounded-md ${!loading && "hover:bg-blue-600"}`}
        >
          {loading ? "Please Wait...":"Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
