import React from 'react';
import { createRoot } from 'react-dom/client'; // Importar createRoot
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Obtener el elemento raíz del DOM
const container = document.getElementById('root');
const root = createRoot(container); // Crear el root con React 18

// Renderizar la aplicación
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Opcional: Para medir el rendimiento de la aplicación
reportWebVitals();


