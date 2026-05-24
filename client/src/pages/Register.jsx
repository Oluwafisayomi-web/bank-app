import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://bank-app-lf5s.onrender.com/api/auth/register",
        formData
      );

      alert(response.data.message);

      navigate("/login");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-4">
      <div className="bg-[#121212] p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-white text-4xl font-bold text-center mb-8">
          Nova Bank
        </h1>

        <h2 className="text-white text-2xl font-semibold mb-6 text-center">
          Create an account
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] text-white p-4 rounded-lg outline-none border border-transparent focus:border-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] text-white p-4 rounded-lg outline-none border border-transparent focus:border-green-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-[#2a2a2a] text-white p-4 rounded-lg outline-none border border-transparent focus:border-green-500"
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-black font-bold py-4 rounded-full hover:bg-green-400 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;