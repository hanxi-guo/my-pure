import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

// Replace these with your Auth0 domain and client ID from the Auth0 dashboard
const domain = "dev-fmxet8578p567ojf.us.auth0.com";
const clientId = "THdU5Cd0h9SxBJYKypfuGopUEqnBklBq";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
