import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import Routel from './app/Routes.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routel />
  </StrictMode>,
)
