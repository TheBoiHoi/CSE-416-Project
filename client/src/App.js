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
import AccountSettings from './components/AccountSettings';

function App() {
  const [user, setUser]=useState(null)//user here can be regular user or a company
  const [filter, setFilter]=useState('')
  useEffect(() => {
    apis.GetCurrentUser().then(response=>{
      if(response.data.user){
        setUser(response.data.user)
      }
      else if(response.data.company){
        setUser(response.data.company)
      }
    }).catch(e => {
      console.log(e.response)
    })
}, [])
  return (
    <div>
    <BrowserRouter>
    <Navbar setUser={setUser} user={user} setFilter={setFilter}/>
      <Routes>
        <Route path="/" element={<Welcome user={user}/>}/>
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/profile" element={<Profile user={user}/>}/>
        <Route path="/public-profile/:userId/:key" element={<PublicProfile user={user}/>}/>
        <Route path="/profile/account_settings" element={<AccountSettings user={user}/>}/>
        <Route path="/item/profile/:itemId" element={<ItemProfile/>}/>
        <Route path="/item/profile" element={<ItemProfile/>}/>
        <Route path ="/inventory-table" element={<InventoryTable company={user} filter={filter}/>}/>
        <Route path="/register" element={<Register setUser={setUser}/>}/>
      </Routes>
    </BrowserRouter>
    
  </div>
    
  );
}

export default App;
