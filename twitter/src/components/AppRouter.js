import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Profile from 'routes/Profile'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Navigation from './Navigation'

const AppRouter = ({isLoggedIn}) => {

  return (
    <Router>
      {isLoggedIn && <Navigation/>} 
      {/* isLoggedIn�� true�� Navigation */}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
            <Route></Route>
          </>
          // �������� �����ϱ� Fragment�� ������� ��
        ) : (
          <Route path="/" element={<Auth />}></Route>
        )}
      </Routes>
    </Router>
  )
}

export default AppRouter
