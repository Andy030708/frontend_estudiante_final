import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { estudianteService } from '../services/api';

function DetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarEstudiante = async () => {
      try {
        setLoading(true);
        const data = await estudianteService.getById(id);
        setEstudiante(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar el estudiante');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarEstudiante();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('¿Está seguro de eliminar este estudiante?')) {
      try {
        await estudianteService.delete(id);
        navigate('/');
      } catch (err) {
        setError('Error al eliminar el estudiante');
        console.error(err);
      }
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <div className="error-message">{error}</div>;
  if (!estudiante) return <p>Estudiante no encontrado</p>;

  return (
    <div className="detalle-page">
      <h1>Detalle del Estudiante</h1>

      <div className="detalle-card">
        <div className="detalle-item">
          <strong>ID:</strong> {estudiante.id}
        </div>
        <div className="detalle-item">
          <strong>Nombre:</strong> {estudiante.nombre}
        </div>
        <div className="detalle-item">
          <strong>Edad:</strong> {estudiante.edad} años
        </div>
        <div className="detalle-item">
          <strong>Carrera:</strong> {estudiante.carrera}
        </div>
        <div className="detalle-item">
          <strong>Promedio:</strong> {estudiante.promedio}
        </div>
      </div>

      <div className="detalle-actions">
        <Link to="/" className="btn btn-secondary">
          Volver
        </Link>
        <Link to={`/estudiantes/editar/${id}`} className="btn btn-warning">
          Editar
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default DetallePage;