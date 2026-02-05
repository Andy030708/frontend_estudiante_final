import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EstudianteForm from '../components/EstudianteForm';

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('EstudianteForm', () => {
  const mockOnSubmit = vi.fn();

  it('debe renderizar el formulario con título', () => {
    renderWithRouter(
      <EstudianteForm titulo="Crear Estudiante" onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText('Crear Estudiante')).toBeInTheDocument();
  });

  it('debe renderizar todos los campos del formulario', () => {
    renderWithRouter(
      <EstudianteForm titulo="Test" onSubmit={mockOnSubmit} />
    );

    expect(screen.getByLabelText('Nombre:')).toBeInTheDocument();
    expect(screen.getByLabelText('Edad:')).toBeInTheDocument();
    expect(screen.getByLabelText('Carrera:')).toBeInTheDocument();
    expect(screen.getByLabelText('Promedio:')).toBeInTheDocument();
  });

  it('debe mostrar errores de validación cuando campos están vacíos', async () => {
    renderWithRouter(
      <EstudianteForm titulo="Test" onSubmit={mockOnSubmit} />
    );

    const submitButton = screen.getByText('Guardar');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
    });
  });

  it('debe actualizar el valor del campo nombre', () => {
    renderWithRouter(
      <EstudianteForm titulo="Test" onSubmit={mockOnSubmit} />
    );

    const nombreInput = screen.getByLabelText('Nombre:');
    fireEvent.change(nombreInput, { target: { value: 'Juan Test' } });

    expect(nombreInput.value).toBe('Juan Test');
  });

  it('debe cargar datos iniciales en modo edición', () => {
    const estudianteInicial = {
      nombre: 'Carlos',
      edad: 25,
      carrera: 'Software',
      promedio: 9.0,
    };

    renderWithRouter(
      <EstudianteForm
        titulo="Editar"
        onSubmit={mockOnSubmit}
        estudianteInicial={estudianteInicial}
      />
    );

    expect(screen.getByLabelText('Nombre:').value).toBe('Carlos');
    expect(screen.getByLabelText('Edad:').value).toBe('25');
    expect(screen.getByLabelText('Carrera:').value).toBe('Software');
  });

  it('debe tener botón de cancelar', () => {
    renderWithRouter(
      <EstudianteForm titulo="Test" onSubmit={mockOnSubmit} />
    );

    expect(screen.getByText('Cancelar')).toBeInTheDocument();
  });

  it('debe llamar onSubmit con datos válidos', async () => {
    renderWithRouter(
      <EstudianteForm titulo="Test" onSubmit={mockOnSubmit} />
    );

    fireEvent.change(screen.getByLabelText('Nombre:'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Edad:'), { target: { value: '22' } });
    fireEvent.change(screen.getByLabelText('Carrera:'), { target: { value: 'Software' } });
    fireEvent.change(screen.getByLabelText('Promedio:'), { target: { value: '8.5' } });

    fireEvent.click(screen.getByText('Guardar'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        nombre: 'Test User',
        edad: 22,
        carrera: 'Software',
        promedio: 8.5,
      });
    });
  });
});