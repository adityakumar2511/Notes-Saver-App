import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem('pastes') 
    ? JSON.parse(localStorage.getItem('pastes'))
    : [],
  user: localStorage.getItem('user:- ')
    ? JSON.parse(localStorage.getItem('user:- '))
    : null,
  isLoggedIn: localStorage.getItem('user:- ') ? true : false,
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      if (state.user) {
        paste.userEmail = state.user.email;
        state.pastes.push(paste);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Created Successfully");
      } else {
        toast.error("Please login to create paste.");
      }
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated Successfully");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);
      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Deleted");
      }
    },

    signupUser: (state, action) => {
      const { email, password, name } = action.payload;
      const newUser = { email, password, name };

      // Get existing users list
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Check if user already exists
      const existing = users.find((u) => u.email === email);
      if (existing) {
        toast.error("User already exists.");
        return;
      }

      // Save new user
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Login this user
      localStorage.setItem("user:- ", JSON.stringify(newUser));
      state.user = newUser;
      state.isLoggedIn = true;
      toast.success("Signup Successfully.");
    },

    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        localStorage.setItem("user:- ", JSON.stringify(matchedUser));
        state.user = matchedUser;
        state.isLoggedIn = true;
        toast.success("Login Successfully.");
      } else {
        toast.error("Invalid credentials.");
      }
    },

    logoutUser: (state) => {
      localStorage.removeItem("user:- ");
      state.user = null;
      state.isLoggedIn = false;
      toast.success("Logout Successfully.");
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
  signupUser,
  loginUser,
  logoutUser,
} = pasteSlice.actions;

export default pasteSlice.reducer;
