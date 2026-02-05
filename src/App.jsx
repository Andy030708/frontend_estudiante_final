import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetallePage from './pages/DetallePage';
import CrearPage from './pages/CrearPage';
import EditarPage from './pages/EditarPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estudiantes/nuevo" element={<CrearPage />} />
          <Route path="/estudiantes/:id" element={<DetallePage />} />
          <Route path="/estudiantes/editar/:id" element={<EditarPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;