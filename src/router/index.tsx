import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, NotFound, PokemonDetailPage } from "../pages";

export default function MainRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}
