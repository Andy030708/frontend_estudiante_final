import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { estudianteService } from '../services/api';
import EstudiantesTable from '../components/EstudiantesTable';

function HomePage() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [filtroCarrera, setFiltroCarrera] = useState('');
  const [promedioGeneral, setPromedioGeneral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarEstudiantes = async (carrera = '') => {
    try {
      setLoading(true);
      const data = await estudianteService.getAll(carrera);
      setEstudiantes(data.results || data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los estudiantes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cargarPromedioGeneral = async () => {
    try {
      const data = await estudianteService.getPromedioGeneral();
      setPromedioGeneral(data);
    } catch (err) {
      console.error('Error al cargar promedio general:', err);
    }
  };

  useEffect(() => {
    cargarEstudiantes();
    cargarPromedioGeneral();
  }, []);

  const handleFiltrar = () => {
    cargarEstudiantes(filtroCarrera);
  };

  const handleLimpiarFiltro = () => {
    setFiltroCarrera('');
    cargarEstudiantes();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este estudiante?')) {
      try {
        await estudianteService.delete(id);
        cargarEstudiantes(filtroCarrera);
        cargarPromedioGeneral();
      } catch (err) {
        setError('Error al eliminar el estudiante');
        console.error(err);
      }
    }
  };

  return (
    <div className="home-page">
      <h1>Sistema de Gestión de Estudiantes</h1>

      {promedioGeneral && (
        <div className="promedio-card">
          <h3>Promedio General: {promedioGeneral.promedio_general}</h3>
          <p>Total de estudiantes: {promedioGeneral.total_estudiantes}</p>
        </div>
      )}

      <div className="filtro-section">
        <input
          type="text"
          placeholder="Filtrar por carrera..."
          value={filtroCarrera}
          onChange={(e) => setFiltroCarrera(e.target.value)}
        />
        <button onClick={handleFiltrar} className="btn btn-primary">
          Filtrar
        </button>
        <button onClick={handleLimpiarFiltro} className="btn btn-secondary">
          Limpiar
        </button>
        <Link to="/estudiantes/nuevo" className="btn btn-success">
          Nuevo Estudiante
        </Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <EstudiantesTable estudiantes={estudiantes} onDelete={handleDelete} />
      )}
    </div>
  );
}

export default HomePage;