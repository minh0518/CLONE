import React from 'react'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Detail from './routes/Detail'
import Home from './routes/Home'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/hello" element={<h1> Hello World! </h1>} />
      </Routes>
    </Router>
  )
}

export default App
