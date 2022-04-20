import './App.css';
import Login from './Login'
import Welcome from './components/Welcome'
import Register from './components/Register'
import {Profile} from './components/Profile'
import ItemProfile from './components/ItemProfile/ItemProfile'
import {InventoryTable} from './components/InventoryTable/MainTable/InventoryTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Navbar} from './components/Navbar';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar isCompany ={true}/>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile/:userId" element={<Profile/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/item_profile" element={<ItemProfile/>}/>
          <Route path ="/inventory_table" element={<InventoryTable/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
    
  );
}

export default App;
