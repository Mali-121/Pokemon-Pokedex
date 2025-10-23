import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PokemonList } from './components/PokemonList';
import { PokemonDetailsComponent } from './components/PokemonDetails';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetailsComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
