import './App.css';
import Login from './Login'
import Welcome from './components/Welcome'
import Register from './components/Register'
import {Profile} from './components/Profile'
import {InventoryTable} from './components/InventoryTable/MainTable/InventoryTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navbar} from './components/Navbar';
import {useState, useEffect} from 'react'

function App() {
  const [isUser, toggleIsUser]=useState(false)
  const [userName, setUserName]=useState("")
  return (
    <div>
      <BrowserRouter>
      <Navbar isUser ={isUser} userName={userName}/>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile/:userId" element={<Profile setUserName={setUserName} toggleIsUser={toggleIsUser}/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path ="/inventory_table" element={<InventoryTable/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
