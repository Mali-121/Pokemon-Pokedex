import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { pokemonAPI, PokemonAPIError } from '../services/pokemonAPI';
import { PokemonTile } from './PokemonTile';
import './PokemonList.css';

interface Pokemon {
  name: string;
  url: string;
}

export const PokemonList: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedPokemon, setHighlightedPokemon] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const scrollPositionRef = useRef<number>(0);
  const hasRestoredScroll = useRef<boolean>(false);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  useEffect(() => {
    // Restores the scroll position when returning from details page 
    if (location.state?.fromDetails && pokemonList.length > 0 && !hasRestoredScroll.current) {
      hasRestoredScroll.current = true;
      
      // to show the pokemon that was selected we will be highlighting them
      if (location.state.pokemonName) {
        setHighlightedPokemon(location.state.pokemonName);
        
        // this will remove the highlight on that pokemon after 3 seconds
        setTimeout(() => {
          setHighlightedPokemon(null);
        }, 3000);
      }
      
      
      const savedScrollPosition = location.state.scrollPosition || scrollPositionRef.current;
      
      
      requestAnimationFrame(() => {
        window.scrollTo({
          top: savedScrollPosition,
          behavior: 'instant'
        });
      });
    }
  }, [pokemonList, location.state]);

  const fetchPokemonList = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await pokemonAPI.fetchPokemonList(50, 0);
      setPokemonList(response.results);
    } catch (err) {
      if (err instanceof PokemonAPIError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePokemonClick = useCallback((name: string) => {
    // Save current scroll position before navigating
    scrollPositionRef.current = window.scrollY;
    
    // Navigate with state to indicate we're going to details
    navigate(`/pokemon/${name}`, { 
      state: { 
        fromList: true,
        scrollPosition: window.scrollY
      } 
    });
  }, [navigate]);

  const handleRetry = () => {
    fetchPokemonList();
  };

  if (loading) {
    return (
      <div className="pokemon-list-container">
        <h1 className="page-title">Pokemon Pokedex</h1>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-list-container">
        <h1 className="page-title">Pokemon Pokedex</h1>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={handleRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-list-container">
      <h1 className="page-title">Pokemon Pokedex</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <PokemonTile
            key={pokemon.name}
            pokemon={pokemon}
            onClick={handlePokemonClick}
            isHighlighted={highlightedPokemon === pokemon.name}
          />
        ))}
      </div>
    </div>
  );
};
