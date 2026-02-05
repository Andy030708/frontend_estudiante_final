import { useNavigate } from 'react-router-dom';
import { estudianteService } from '../services/api';
import EstudianteForm from '../components/EstudianteForm';

function CrearPage() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await estudianteService.create(data);
      navigate('/');
    } catch (err) {
      console.error('Error al crear estudiante:', err);
      alert('Error al crear el estudiante');
    }
  };

  return (
    <EstudianteForm
      titulo="Crear Nuevo Estudiante"
      onSubmit={handleSubmit}
    />
  );
}

export default CrearPage;