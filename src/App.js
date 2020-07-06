import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {Contact} from '../src/Contact';
function App() {
  return (
    <BrowserRouter>
    <div  clasname="container">
      <Switch>
        <Route path="/" component={Contact} exact/>
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
