import logo from './logo.svg';
import './App.css';
import Login from './Login'
import Profile from './components/Profile'

import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
