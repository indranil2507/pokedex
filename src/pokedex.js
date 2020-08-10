import React,{useState,useEffect, useLayoutEffect} from 'react';
import{Button,Card}  from 'react-bootstrap/Button';

import pokeball from './assets/pokeballbg.jpg';

import mockdata from './mockdata';
import {CircularProgress, useEventCallback} from '@material-ui/core';
import axios from 'axios';


  import './pokedex.css'
const Pokedex =(props)=>{
    const { history } = props;

    const [pokemonData,setpokemonData] = useState({});
    const [filter, setFilter] = useState("");

    const handleSearchChange=(e)=>{
        setFilter(e.target.value);
    }
    useEffect(()=>{
        axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
        .then(function(response){
            const{data}=response;
            const{results}=data;
            const newPokemonData={};
            results.forEach((pokemon, index) => {
                newPokemonData[index + 1] = {
                  id: index + 1,
                  name: pokemon.name,
                  sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`,
                };
        });
        setpokemonData(newPokemonData)
    });
}, []);
    
      
const getPokemonCard=(pokemonId)=>{
    
    const{id,name,sprite}= pokemonData[`${pokemonId}`]
    
    
   
    return(
        <div className="cardp" key={pokemonId}> 
            <div className="card" >
            <img className="card-img-top mx-auto" src={sprite} alt="Card image cap" />
            <div className="card-body">
            <div className="mat">
            <h5 className="card-title">{`${id}.${name}`}</h5>
            <p className="card-text"></p>
            </div>
            <div className="link"onClick={() => history.push(`/${id}`)}><img class="link-img"  src={pokeball} alt="click here" /></div>
            </div>
            </div>
            </div>
        
    );
} 

    
    return(
        <div>
            <div>
               
            </div>
            <div className="searchbox">
                <input className="search-input" onChange={ handleSearchChange} type="text" placeholder="type your pokemon here" />
                <button className="search-button" onClick={handleSearchChange} type="submit" >Search</button>
            </div>
            {pokemonData? <div className="grid">
                {Object.keys(pokemonData).map((pokemonId)=>
                    pokemonData[pokemonId].name.includes(filter) &&
                    getPokemonCard(pokemonId)
                )}
            
           
           
            </div>:(<CircularProgress/>)}
            
            </div>



        


        
       
        
      
       
      
    )
}
export default Pokedex;