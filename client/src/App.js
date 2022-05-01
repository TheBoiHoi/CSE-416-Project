import './App.css';
import Login from './Login'
import Welcome from './components/Welcome'
import Register from './components/Register'
import {Profile} from './components/Profile'
import {PublicProfile} from './components/PublicProfile'
import ItemProfile from './components/ItemProfile/ItemProfile'
import {InventoryTable} from './components/InventoryTable/MainTable/InventoryTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navbar} from './components/Navbar';
import {useState, useEffect} from "react"
import apis from './api'
import { useCookies } from 'react-cookie';
function App() {
  const [user, setUser]=useState(null)
  const [company,setCompany]= useState(null)
  useEffect(() => {
    apis.GetCurrentUser().then(response=>{
      if(response.data.user){
        setUser(response.data.user)
      }
    }).catch(e => {
      console.log(e.response)
    })
}, [])
useEffect(()=>{
  apis.GetCompany().then(response=>{
    if(response.data.company){
      setCompany(response.data.company)
    }
  }).catch(e => {
    console.log(e.response)
  })
},[])
  return (
    <div>
    <BrowserRouter>
    <Navbar user={user} isCompany={true}/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login setUser={setUser} setCompany={setCompany}/>}/>
        <Route path="/profile" element={<Profile setUser={setUser} user={user}/>}/>
        <Route path="/public/profile/:userId/:key" element={<PublicProfile/>}/>
        <Route path="/item/profile" element={<ItemProfile/>}/>
        <Route path ="/inventory_table" element={<InventoryTable setCompany={setCompany} company={company}/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    
  </div>
    
  );
}

export default App;
