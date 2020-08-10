import React,{useEffect,useState} from 'react';
import pokeball from './assets/pokeballbg.jpg';
import './pokemon.css';
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import {toFirstCharUppercase} from './constant';
import axios from 'axios'
const Pokemon =(props)=>{
    const {match,history} = props;
    const {params} = match;
    const {pokemonId} = params;
    const[pokemon,setPokemon]=useState(undefined)
    useEffect(() => {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
        .then(function (response) {
          const { data } = response;
          setPokemon(data);
        })
        .catch(function (error) {
          setPokemon(false);
        });
    }, [pokemonId]);
  
    const generatePokemonJSX=()=>{
        const { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
        const { front_default } = sprites;
        
        return(
            <>
            <div>
                <div class="container">
                    <div className="head">
                    <h1>{`${id}.`}{toFirstCharUppercase(name)}<img src={front_default}/></h1> 
                    </div>
                
                    
                    <div class="row">
                    
                        <div class="col-lg-6" >
                        <div className="image">
                            
                            <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
                            </div>
                           
                            </div>
                            
                        <div class="col-lg-6" >
                        <div className="text">
                        <img class="linki"  src={pokeball} alt="click here" />
                        <br/>
                        <div className="textsub">
                        {"Species: "}
                        <Link href={species.url}>{species.name} </Link> 
                        
                        <br/>                  
                         Height: {height}
                        <br/>
                        Weight: {weight}
                        <br/>
                        Types:
                        {types.map((typeInfo) => {
                        const { type } = typeInfo;
                        const { name } = type;
                        return <Typography variant="h5" key={name}> {`${name}`}</Typography>;
                        })}
                        </div>
                       
                        </div>
                       
                        </div>
                    </div>
                </div>
              
                
            </div>
            </>
        
            );

    };
    return (
        <>
          {pokemon === undefined && <CircularProgress />}
          {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
          {pokemon === false && <Typography> Pokemon not found</Typography>}
          {pokemon !== undefined && (
            <div className="button">
              
                <Button  class="mx-auto" variant="contained" onClick={() => history.push("/")}>
                
                 <div className="btn">Back to pokedex</div>
            </Button>
            </div>
            
          )}
        </>
      );
    
};
export default Pokemon;