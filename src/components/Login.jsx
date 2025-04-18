import { useState } from 'react';
import { useNavigate , Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/pasteSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
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
  
    // ✅ get all registered users
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  
    // ✅ find user by email
    const matchedUser = allUsers.find(user => user.email === email);
  
    if (!matchedUser) {
      alert("User not found. Please sign up first.");
      return;
    }
  
    if (matchedUser.password !== password) {
      alert("Invalid credentials.");
      return;
    }
  
    // ✅ success login
    dispatch(loginUser({ email: matchedUser.email, password: matchedUser.password }));
    localStorage.setItem("user:- ", JSON.stringify(matchedUser)); // Make sure this is set!
    alert("Login Successfully.");
    navigate("/");
  };
  
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-300 to-purple-200 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 text-sm sm:text-base"
          >
            Login
          </button>
        </form>
        <p className="text-xs sm:text-sm text-gray-600 text-center mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
