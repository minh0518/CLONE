import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from 'react-router-dom'
import Profile from 'routes/Profile'
import Auth from '../routes/Auth'
import Home from '../routes/Home'
import Navigation from './Navigation'

const AppRouter = ({ userObj, isLoggedIn, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      {/* isLoggedIn이 true면 Navigation */}
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home userObj={userObj} />}></Route>
            <Route
              path="/profile"
              element={<Profile userObj={userObj} refreshUser={refreshUser} />}
            ></Route>
          </>
          // 여러개가 있으니까 Fragment로 감싸줘야 함
        ) : (
          <>
            <Route path="/" element={<Auth />}></Route>
            
            {/* 로그아웃됐을 때의 경로 추가*/}
            {/* <Route path="*" element={<Navigate replace to="/profile"/>} /> */}
          </>
        )}
      </Routes>
    </Router>
  )
}

export default AppRouter
