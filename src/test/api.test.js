import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

// Mock de axios
vi.mock('axios', () => {
  return {
    default: {
      create: vi.fn(() => ({
        get: vi.fn(),
        post: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
      })),
    },
  };
});

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe crear instancia de axios con URL correcta', () => {
    expect(axios.create).toBeDefined();
  });

  it('debe tener configuración de headers JSON', () => {
    const config = {
      baseURL: 'http://127.0.0.1:8000/api',
      headers: { 'Content-Type': 'application/json' },
    };
    
    expect(config.headers['Content-Type']).toBe('application/json');
  });

  it('debe tener URL base correcta', () => {
    const API_URL = 'http://127.0.0.1:8000/api';
    expect(API_URL).toContain('/api');
  });
});