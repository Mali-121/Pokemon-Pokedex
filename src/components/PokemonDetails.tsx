import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { pokemonAPI, PokemonAPIError } from '../services/pokemonAPI';
import './PokemonDetails.css';

interface PokemonStat {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
}

interface PokemonType {
  type: {
    name: string;
    url: string;
  };
}

interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  stats?: PokemonStat[];
  types?: PokemonType[];
  abilities?: PokemonAbility[];
}

export const PokemonDetailsComponent: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (name) {
      fetchPokemonDetails(name);
    }
  }, [name]);

  const fetchPokemonDetails = async (pokemonName: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonAPI.fetchPokemonDetails(pokemonName);
      setPokemon(data as PokemonDetails);
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

  const handleBackClick = () => {
    navigate('/', { 
      state: { 
        fromDetails: true,
        scrollPosition: location.state?.scrollPosition || 0,
        pokemonName: pokemon?.name || name
      } 
    });
  };

  const handleRetry = () => {
    if (name) {
      fetchPokemonDetails(name);
    }
  };

  if (loading) {
    return (
      <div className="pokemon-details-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Pokémon details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-details-container">
        <button onClick={handleBackClick} className="back-button">
          ← Back to Pokédex
        </button>
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

  if (!pokemon) {
    return (
      <div className="pokemon-details-container">
        <button onClick={handleBackClick} className="back-button">
          ← Back to Pokédex
        </button>
        <div className="error-container">
          <h2>Pokémon not found</h2>
        </div>
      </div>
    );
  }

  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  // Get key stats
  const hpStat = pokemon.stats?.find((stat: PokemonStat) => stat.stat.name === 'hp');
  const attackStat = pokemon.stats?.find((stat: PokemonStat) => stat.stat.name === 'attack');
  const defenseStat = pokemon.stats?.find((stat: PokemonStat) => stat.stat.name === 'defense');

  return (
    <div className="pokemon-details-container">
      <button onClick={handleBackClick} className="back-button">
        ← Back to Pokédex
      </button>
      
      <div className="pokemon-details-card">
        <div className="pokemon-header">
          <div className="pokemon-image-container">
            <img 
              src={imageUrl} 
              alt={capitalizedName}
              className="pokemon-detail-image"
            />
          </div>
          <div className="pokemon-info">
            <h1 className="pokemon-name">{capitalizedName}</h1>
            <p className="pokemon-id">#{pokemon.id.toString().padStart(3, '0')}</p>
            <div className="pokemon-measurements">
              <div className="measurement">
                <span className="label">Height:</span>
                <span className="value">{(pokemon.height / 10).toFixed(1)} m</span>
              </div>
              <div className="measurement">
                <span className="label">Weight:</span>
                <span className="value">{(pokemon.weight / 10).toFixed(1)} kg</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pokemon-details-content">
          <div className="types-section">
            <h3>Types</h3>
            <div className="types-container">
              {pokemon.types?.map((type: PokemonType, index: number) => (
                <span key={index} className="type-badge">
                  {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <div className="abilities-section">
            <h3>Abilities</h3>
            <div className="abilities-container">
              {pokemon.abilities?.map((ability: PokemonAbility, index: number) => (
                <span key={index} className="ability-badge">
                  {ability.ability.name.charAt(0).toUpperCase() + ability.ability.name.slice(1)}
                </span>
              ))}
            </div>
          </div>

          <div className="stats-section">
            <h3>Key Stats</h3>
            <div className="stats-container">
              {hpStat && (
                <div className="stat-item">
                  <span className="stat-name">HP</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill" 
                      style={{ width: `${Math.min((hpStat.base_stat / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{hpStat.base_stat}</span>
                </div>
              )}
              {attackStat && (
                <div className="stat-item">
                  <span className="stat-name">Attack</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill" 
                      style={{ width: `${Math.min((attackStat.base_stat / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{attackStat.base_stat}</span>
                </div>
              )}
              {defenseStat && (
                <div className="stat-item">
                  <span className="stat-name">Defense</span>
                  <div className="stat-bar">
                    <div 
                      className="stat-fill" 
                      style={{ width: `${Math.min((defenseStat.base_stat / 150) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <span className="stat-value">{defenseStat.base_stat}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
