import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Private from './components/Private';
import Home from './components/Home';
import AddSong from './components/AddSong';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<Private />}>
          <Route path='/home' element={<Home />} />
          <Route path='/addsong' element={<AddSong />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
