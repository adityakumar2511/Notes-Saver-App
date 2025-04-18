import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSignup = (e) => {
    e.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Confirm Password does not match.");
      return;
    }
  
    const userData = { email, password, name };
  
    // ✅ Add user to users list
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  
    // Check if user already exists
    const alreadyExists = allUsers.find(user => user.email === email);
    if (alreadyExists) {
      alert("User already exists. Please login instead.");
      return;
    }
  
    allUsers.push(userData);
    localStorage.setItem("users", JSON.stringify(allUsers));
  
    // ✅ Also save as current logged-in user (if needed)
    localStorage.setItem("user:- ", JSON.stringify(userData));
  
    alert("Signup Successfully.");
    console.log("User data saved:", userData);
  
    // Clear inputs
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  
    navigate("/login");
  };
  
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-200">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSignup} className="space-y-4">
          <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              onSubmit={handleSignup}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="text-sm text-gray-600 text-center mt-4">
            You have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
    );
}

export default Signup
