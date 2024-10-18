import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonPage from "./pages/PokemonPage";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:name" element={<PokemonPage />} />
            </Routes>
        </Router>
    );
};

export default App;
