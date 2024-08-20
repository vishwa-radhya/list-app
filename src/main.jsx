import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import { FolderNamesProvider } from './contexts/folder-names-context.jsx';
import { SideBarProvider } from './contexts/side-bar-context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FolderNamesProvider>
        <SideBarProvider>
            <App />
        </SideBarProvider>
      </FolderNamesProvider>
    </AuthProvider>
  </React.StrictMode>,
)
