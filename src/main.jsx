import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import { FolderNamesProvider } from './contexts/folder-names-context.jsx';
import { SideBarProvider } from './contexts/side-bar-context.jsx';
import { ListItemsProvider } from './contexts/list-items-context.jsx';
import { AditionalInfoProvider } from './contexts/aditionalnfoProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <FolderNamesProvider>
        <SideBarProvider>
          <ListItemsProvider>
            <AditionalInfoProvider>
              <App />
            </AditionalInfoProvider>
          </ListItemsProvider>
        </SideBarProvider>
      </FolderNamesProvider>
    </AuthProvider>
  </React.StrictMode>,
)
