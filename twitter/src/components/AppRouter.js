import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import Profile from 'routes/Profile'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Navigation from './Navigation'

const AppRouter = ({userObj,isLoggedIn}) => {

  return (
    <Router>
      {isLoggedIn && <Navigation/>} 
      {/* isLoggedIn�� true�� Navigation */}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj}/>}></Route>
            <Route path="/profile" element={<Profile/>}></Route>
          </>
          // �������� �����ϱ� Fragment�� ������� ��
        ) : (
          <>
          <Route path="/" element={<Auth />}></Route>
          
          {/* �α׾ƿ����� ���� ��� �߰�*/}
          {/* <Route path="*" element={<Navigate replace to="/profile"/>} /> */}
          </>
        )}
      </Routes>
    </Router>
  )
}

export default AppRouter
