import React, {useState} from 'react'

const SignUp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const [error, setError] = useState("");

    const handleChanges = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError("");

        if(formData.name === "" || formData.email === "" || formData.password === "") {
            setError("All fields necessary.");
            return;
        }

        // using fetch for posting data to backend register route

        try{
            const response = await fetch("http://localhost:5000/api/v1/user/signup", {
                method: "POST",
                header: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if(data.error) {
                setError(data.error);
                return;
            }

            alert("User registered successfully.");

            setFormData({
                name: "",
                email: "",
                password: "",
                role: "student"
            })
        } catch(errr){
            setError(errr.message);
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

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Signup
        </button>
      </form>
    </div>
    );
};

export default SignUp;
