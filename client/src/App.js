import './App.css';
import Login from './Login'
import {Profile} from './components/Profile'
import {InventoryTable} from './components/InventoryTable/MainTable/InventoryTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path ="/inventory_table" element={<InventoryTable/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
