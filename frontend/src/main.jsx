import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import StartMenu from "./components/StartMenu.jsx";
import Game from "./components/Game.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<StartMenu />} />
                    <Route path="/game" element={<Game />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
