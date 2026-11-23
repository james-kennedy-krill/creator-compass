import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { redirectLegacyHash } from './legacyHash';
import './styles/global.css';

// Registered before the router mounts, so these run before the router reads the
// URL. Hash navigation fires popstate (which the router listens to) before hashchange.
redirectLegacyHash();
window.addEventListener('popstate', redirectLegacyHash);
window.addEventListener('hashchange', redirectLegacyHash);

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
