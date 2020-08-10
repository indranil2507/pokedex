import React,{useEffect,useState} from 'react';
import {Route,Switch } from 'react-router-dom';
import Pokedex from './pokedex';
import Pokemon from './pokemon'


function App() {
 
  
 
  return (
    <Switch>
     <Route exact path="/" render={(props) => <Pokedex {...props} />} />
     <Route path="/:pokemonId" render={(props) => <Pokemon {...props}/>}/>
    </Switch>
  );
}

export default App;
