import './App.css'
import Create from './views/Create';
import Home from './views/Home'
import Login from './views/Login'
import { Routes, Route } from 'react-router-dom';
import View from './views/View';
import CreateUser from './views/CreateUser';
import ViewUser from './views/ViewUser';

function App() {

  return (
    <>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Home />} />
      <Route path="/crear" element={<Create />} />
      <Route path="/ver" element={<View />} />
      <Route path="/crearUsuario" element={<CreateUser />} />
      <Route path="/verUsuarios" element={<ViewUser />} />
    </Routes>
    </>
  )
}

export default App
