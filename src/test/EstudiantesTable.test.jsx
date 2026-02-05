import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EstudiantesTable from '../components/EstudiantesTable';

// Wrapper para componentes que usan Router
const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('EstudiantesTable', () => {
  const mockEstudiantes = [
    { id: 1, nombre: 'Juan Pérez', edad: 22, carrera: 'Software', promedio: 8.5 },
    { id: 2, nombre: 'María García', edad: 20, carrera: 'Sistemas', promedio: 9.0 },
  ];

  const mockOnDelete = vi.fn();

  it('debe mostrar mensaje cuando no hay estudiantes', () => {
    renderWithRouter(
      <EstudiantesTable estudiantes={[]} onDelete={mockOnDelete} />
    );

    expect(screen.getByText('No hay estudiantes registrados.')).toBeInTheDocument();
  });

  it('debe renderizar la tabla con estudiantes', () => {
    renderWithRouter(
      <EstudiantesTable estudiantes={mockEstudiantes} onDelete={mockOnDelete} />
    );

    expect(screen.getByText('Juan Pérez')).toBeInTheDocument();
    expect(screen.getByText('María García')).toBeInTheDocument();
  });

  it('debe mostrar todos los campos del estudiante', () => {
    renderWithRouter(
      <EstudiantesTable estudiantes={mockEstudiantes} onDelete={mockOnDelete} />
    );

    expect(screen.getByText('22')).toBeInTheDocument();
    expect(screen.getByText('Software')).toBeInTheDocument();
    expect(screen.getByText('8.5')).toBeInTheDocument();
  });

  it('debe tener botones de acción para cada estudiante', () => {
    renderWithRouter(
      <EstudiantesTable estudiantes={mockEstudiantes} onDelete={mockOnDelete} />
    );

    const verButtons = screen.getAllByText('Ver');
    const editarButtons = screen.getAllByText('Editar');
    const eliminarButtons = screen.getAllByText('Eliminar');

    expect(verButtons).toHaveLength(2);
    expect(editarButtons).toHaveLength(2);
    expect(eliminarButtons).toHaveLength(2);
  });

  it('debe llamar onDelete al hacer click en Eliminar', () => {
    renderWithRouter(
      <EstudiantesTable estudiantes={mockEstudiantes} onDelete={mockOnDelete} />
    );

    const eliminarButtons = screen.getAllByText('Eliminar');
    fireEvent.click(eliminarButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('debe tener enlaces correctos para Ver', () => {
    renderWithRouter(
      <EstudiantesTable estudiantes={mockEstudiantes} onDelete={mockOnDelete} />
    );

    const verLinks = screen.getAllByText('Ver');
    expect(verLinks[0].closest('a')).toHaveAttribute('href', '/estudiantes/1');
    expect(verLinks[1].closest('a')).toHaveAttribute('href', '/estudiantes/2');
  });

  it('debe tener enlaces correctos para Editar', () => {
    renderWithRouter(
      <EstudiantesTable estudiantes={mockEstudiantes} onDelete={mockOnDelete} />
    );

    const editarLinks = screen.getAllByText('Editar');
    expect(editarLinks[0].closest('a')).toHaveAttribute('href', '/estudiantes/editar/1');
  });
});