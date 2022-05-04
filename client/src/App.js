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
  const [isUser,setIsUser]=useState()
  const [isCompany,setIsCompany]=useState()
  //const [company,setCompany]= useState(null)
  useEffect(() => {
    apis.GetCurrentUser().then(response=>{
      if(response.data.user){
        setIsUser(true)
        setUser(response.data.user)
      }
      else if(response.data.company){
        setIsCompany(true)
        setUser(response.data.company)
        
      }
    }).catch(e => {
      console.log(e.response)
    })
}, [])
  return (
    <div>
    <BrowserRouter>
    <Navbar user={user} isUser = {isUser} isCompany={isCompany}/>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/profile" element={<Profile setUser={setUser} user={user}/>}/>
        <Route path="/public/profile/:userId/:key" element={<PublicProfile/>}/>
        <Route path="/item/profile" element={<ItemProfile/>}/>
        <Route path ="/inventory-table" element={<InventoryTable company={user}/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    
  </div>
    
  );
}

export default App;
