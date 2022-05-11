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

function App() {
  const [user, setUser]=useState(null)//user here can be regular user or a company
  const [isUser,setIsUser]=useState(false)
  const [isCompany,setIsCompany]=useState(false)
  useEffect(() => {
    apis.GetCurrentUser().then(response=>{
      if(response.data.user){
        setUser(response.data.user)
        setIsUser(true)
      }
      else if(response.data.company){
        setUser(response.data.company)
        setIsCompany(true)
      }
    }).catch(e => {
      console.log(e.response)
    })
}, [])
  return (
    <div>
    <BrowserRouter>
    <Navbar setUser={setUser} user={user} isUser = {isUser} isCompany={isCompany}/>
      <Routes>
        <Route path="/" element={<Welcome user={user}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/profile" element={<Profile user={user}/>}/>
        <Route path="/public/profile/:userId/:key" element={<PublicProfile/>}/>

        <Route path="/item/profile/:itemId" element={<ItemProfile/>}/>
        <Route path="/item/profile" element={<ItemProfile/>}/>
        <Route path ="/inventory-table" element={<InventoryTable company={user} filter={"none"}/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    
  </div>
    
  );
}

export default App;
