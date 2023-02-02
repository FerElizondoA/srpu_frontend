import React from 'react';
import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router, 
  Route, Link,
  createBrowserRouter, 
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom';

import { LateralMenu } from './components/LateralMenu/LateralMenu';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LateralMenu/>}>
    </Route>
  )
);

function App() {
  return (
  <RouterProvider router={router}/>
  );
}

export default App;

/*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
*/