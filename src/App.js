import React from 'react';
import './App.css';
import AppNavigator from './Navigation/AppNavigator'
import { ToastProvider } from 'react-toast-notifications';

/**
 * Importamos
 */

function App() {

  return (
   
  <div className="App">
    {/**<Categoria/>**/}
    {/**<Turnos/>**/} 

    <ToastProvider>
      <AppNavigator/>
    </ToastProvider>
   
      
  </div>
  );
}

export default App;
