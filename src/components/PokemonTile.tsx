import React, { memo } from 'react';
import './PokemonTile.css';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonTileProps {
  pokemon: Pokemon;
  onClick: (name: string) => void;
  isHighlighted?: boolean;
}

export const PokemonTile: React.FC<PokemonTileProps> = memo(({ pokemon, onClick, isHighlighted = false }) => {
  const handleClick = () => {
    onClick(pokemon.name);
  };

  const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  
  // Extract Pokemon ID from URL for image
  const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return (
    <div className={`pokemon-tile ${isHighlighted ? 'highlighted' : ''}`} onClick={handleClick}>
      <div className="pokemon-image-container">
        <img 
          src={imageUrl} 
          alt={capitalizedName}
          className="pokemon-image"
          loading="lazy"
        />
      </div>
      <div className="pokemon-name">{capitalizedName}</div>
    </div>
  );
});
