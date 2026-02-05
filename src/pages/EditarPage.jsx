import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { estudianteService } from '../services/api';
import EstudianteForm from '../components/EstudianteForm';

function EditarPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estudiante, setEstudiante] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEstudiante = async () => {
      try {
        const data = await estudianteService.getById(id);
        setEstudiante(data);
      } catch (err) {
        console.error('Error al cargar estudiante:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarEstudiante();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await estudianteService.update(id, data);
      navigate('/');
    } catch (err) {
      console.error('Error al actualizar estudiante:', err);
      alert('Error al actualizar el estudiante');
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <EstudianteForm
      titulo="Editar Estudiante"
      estudianteInicial={estudiante}
      onSubmit={handleSubmit}
    />
  );
}

export default EditarPage;