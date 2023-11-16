import React from 'react';
import { Link } from 'react-router-dom'; 
import './App.css'; 

function Header() {
  return (
    <header>
      <div className="logo">
        <h1>Hurmaava Design</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/home">Koti</Link></li> 
          <li><Link to="/">Kauppa</Link></li> 
          <li><Link to="/contact">Ota yhteyttä</Link></li>
          <li><Link to="/loginform">Kirjaudu sisään</Link></li> 
        </ul>
      </nav>
    </header>
  );
}

export default Header;
