import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import { FolderNamesProvider } from './contexts/folder-names-context.jsx';
import { SideBarProvider } from './contexts/side-bar-context.jsx';
import { ListItemsProvider } from './contexts/list-items-context.jsx';
import { AditionalInfoProvider } from './contexts/aditionalnfoProvider.jsx';
import { HelperProvider } from './contexts/helper-context.context.jsx';
import { ToastProvider } from './contexts/toast-context.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <FolderNamesProvider>
          <SideBarProvider>
            <ListItemsProvider>
              <AditionalInfoProvider>
                <HelperProvider>
                  <App />
                </HelperProvider>
              </AditionalInfoProvider>
            </ListItemsProvider>
          </SideBarProvider>
        </FolderNamesProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>,
)
