import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PokemonPage from "./pages/PokemonPage";
import NotFound from "./components/NotFound";

const App: React.FC = () => {
    return (
        <div className="bg-bg-100 min-h-screen text-text-100">
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/pokemon/:name" element={<PokemonPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
