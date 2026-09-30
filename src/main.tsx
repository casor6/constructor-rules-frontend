import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api';
import NewRule from './pages/NewRule';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PrimeReactProvider>
      <NewRule />
    </PrimeReactProvider>
  </StrictMode>,
)
