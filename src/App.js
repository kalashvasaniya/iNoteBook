import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import SignUp from './components/SignUp';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NoteState from './context/notes/NoteState';

const App = () => {

  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="font-mono">
            <Routes>
              <Route exact path="/" element={<Home key="Home" />} />
              <Route exact path="/About" element={<About key="About" />} />
              <Route exact path="/login" element={<Login key="login" />} />
              <Route exact path="/signup" element={<SignUp key="signup" />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
};

export default App;
