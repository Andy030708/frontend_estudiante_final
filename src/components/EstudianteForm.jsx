import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EstudianteForm({ estudianteInicial, onSubmit, titulo }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    carrera: '',
    promedio: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (estudianteInicial) {
      setFormData({
        nombre: estudianteInicial.nombre || '',
        edad: estudianteInicial.edad || '',
        carrera: estudianteInicial.carrera || '',
        promedio: estudianteInicial.promedio || '',
      });
    }
  }, [estudianteInicial]);

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.edad) {
      newErrors.edad = 'La edad es requerida';
    } else if (formData.edad < 1 || formData.edad > 100) {
      newErrors.edad = 'La edad debe estar entre 1 y 100';
    }

    if (!formData.carrera.trim()) {
      newErrors.carrera = 'La carrera es requerida';
    }

    if (!formData.promedio) {
      newErrors.promedio = 'El promedio es requerido';
    } else if (formData.promedio < 0 || formData.promedio > 10) {
      newErrors.promedio = 'El promedio debe estar entre 0 y 10';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    const dataToSend = {
      ...formData,
      edad: parseInt(formData.edad),
      promedio: parseFloat(formData.promedio),
    };

    await onSubmit(dataToSend);
  };

  return (
    <div className="form-container">
      <h2>{titulo}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
          {errors.nombre && <span className="error">{errors.nombre}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="edad">Edad:</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
          />
          {errors.edad && <span className="error">{errors.edad}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="carrera">Carrera:</label>
          <input
            type="text"
            id="carrera"
            name="carrera"
            value={formData.carrera}
            onChange={handleChange}
          />
          {errors.carrera && <span className="error">{errors.carrera}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="promedio">Promedio:</label>
          <input
            type="number"
            step="0.01"
            id="promedio"
            name="promedio"
            value={formData.promedio}
            onChange={handleChange}
          />
          {errors.promedio && <span className="error">{errors.promedio}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EstudianteForm;