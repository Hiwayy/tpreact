import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchTerm}`);
  };

  return (
    <header className="header">
      <div className="header-content">
        <nav className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/categories">Catégories</Link>
        </nav>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une recette..."
          />
          <button type="submit">Rechercher</button>
        </form>
      </div>
    </header>
  );
};

export default Header;