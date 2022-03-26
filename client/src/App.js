import './App.css';
import Login from './Login'
import Welcome from './components/Welcome'
import Register from './components/Register'
import {Profile} from './components/Profile'
import {InventoryTable} from './components/InventoryTable/MainTable/InventoryTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>}/>
          <Route path="/user_login" element={<Login/>}/>
          <Route path="/user_profile/:userId" element={<Profile/>}/>
          <Route path ="/inventory_table" element={<InventoryTable/>}/>
          <Route path="/user_register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
