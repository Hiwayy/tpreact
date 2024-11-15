import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import Categories from './pages/Categories';
import CategoryRecipes from './pages/CategoryRecipes';


function App(){
    return(
        <BrowserRouter>
            <div>
                <Header />
                <main className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;