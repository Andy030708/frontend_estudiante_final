import { Link } from 'react-router-dom';

function EstudiantesTable({ estudiantes, onDelete }) {
  if (estudiantes.length === 0) {
    return <p className="no-data">No hay estudiantes registrados.</p>;
  }

  return (
    <table className="estudiantes-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Carrera</th>
          <th>Promedio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {estudiantes.map((estudiante) => (
          <tr key={estudiante.id}>
            <td>{estudiante.id}</td>
            <td>{estudiante.nombre}</td>
            <td>{estudiante.edad}</td>
            <td>{estudiante.carrera}</td>
            <td>{estudiante.promedio}</td>
            <td className="acciones">
              <Link to={`/estudiantes/${estudiante.id}`} className="btn btn-info">
                Ver
              </Link>
              <Link to={`/estudiantes/editar/${estudiante.id}`} className="btn btn-warning">
                Editar
              </Link>
              <button
                onClick={() => onDelete(estudiante.id)}
                className="btn btn-danger"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EstudiantesTable;